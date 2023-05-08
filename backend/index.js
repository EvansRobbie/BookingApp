const express = require("express");
// coonect with express js
const app = express();
const cors = require("cors");
// import ,ongoose 
const { default: mongoose } = require("mongoose");
// bcrypt to hash password
const bcrypt = require("bcryptjs");
// JSON Web Token, is an open standard used to share information between two parties securely — a client and a server
// . JWT is a standard way of representing claims securely between two parties.
const jwt = require("jsonwebtoken");
// cookie-parser simplifies the handling of cookies in Express.js applications and provides additional security features to protect against attacks such as cookie tampering and session hijacking.
const cookieParser = require("cookie-parser");
const imageDownloader = require('image-downloader')
// Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files to our local directory
const multer  = require('multer')
// npm i @aws-sdk/client-s3 for aws uploads configuration
const {S3Client, PutObjectCommand}=  require('@aws-sdk/client-s3')
const mime = require('mime-types')
// rename path
const fs = require('fs')
// import the user model
const User = require("./models/User");
//  import the place model/ schema
const Places = require('./models/Places')
// import the booking model
const Booking = require('./models/Bookings')
// Put 
require("dotenv").config();
const port = 4000;

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "ffjhgjhbjbgsjhkgdywdhkljklcjklhjbjkbjknjk";
const bucket = 'robbie-booking-app'

 // Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname+'/uploads'))
app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5173",
  })
);
//
// console.log(process.env.S3_SECRET_KEY)

const uploadToS3 =  async  (path, originalFilename, mimetype) =>{
  const client = new S3Client({
    region: 'us-west-2',
    credentials: {
      accessKeyId:process.env.S3_ACCESS_KEY,
      secretAccessKey:process.env.S3_SECRET_ACCESS_KEY,
    }
  })
  const parts = originalFilename.split('.')
  const ext =  parts[parts.length-1]
  const newFilename = Date.now() + '.' + ext
  await client.send(new PutObjectCommand({
    Bucket: bucket,
    Body: fs.readFileSync(path),
    Key:newFilename,
    ContentType:mimetype,
    ACL: 'public-read'
  }))
  // console.log({data})
  return `https://${bucket}.s3.amazonaws.com/${newFilename}`
}

const getUserDataFromToken = (req) =>{
  return new Promise((resolve, reject) =>{
    jwt.verify(req.cookies.token, jwtSecret, {}, (err, userData)=>{
      if (err) throw err;
      resolve(userData)
    })
  })
}
app.get("/backend/test", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  res.json("test Ok");
});

app.post("/backend/register", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { name, email, password } = req.body;
  // res.json({name, email, password})
  try {
    const userData = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userData);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/backend/login", async (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { email, password } = req.body;
  const userData = await User.findOne({ email });
  if (userData) {
    // compare if the passwords match
    const passOk = bcrypt.compareSync(password, userData.password);
    if (passOk) {
      // generates a JSON Web Token (JWT) using jwt.sign(). The token is signed with a secret key (jwtSecret) and contains the user's email and id as payload data
      jwt.sign(
        { email: userData.email, id: userData._id},
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          // The generated token is then set as a cookie named "token" using res.cookie("token", token).
          res.cookie("token", token).json(userData);
        }
      );
    } else {
      res.status(422).json(" pass not okay");
    }
    // res.json('FOund')
  } else {
    res.json("Not found");
  }
});


app.get("/backend/profile", (req, res) => {
  mongoose.connect(process.env.MONGO_URL);
  const { token } = req.cookies;
  // res.json({token})
  if (token) {
    // try and verify the token
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
      if (err) throw err;
     const {name, email, _id} = await User.findById(user.id)
      res.json({name, email, _id});
    });
  } else {
    res.json(null);
  }
});

app.post('/logout', (req, res)=>{
  res.cookie('token', '').json(true)
})
// console.log(__dirname)
app.post('/backend/upload-by-link', async (req, res) =>{
  const {link} = req.body
  const newName = 'photo' + Date.now() + '.jpg'
  await imageDownloader.image({
    url: link,
    // dest: __dirname +'/uploads/'+newName,
    dest: '/tmp/'+newName,
  })
  const url = await uploadToS3('/tmp/'+newName, newName, mime.lookup('/tmp/'+newName))
  res.json(url)
})

const photoMiddleware = multer({dest:'/tmp'}) //'uploads/'
app.post('/backend/upload',photoMiddleware.array('images', 100) ,async (req, res) =>{
  // app.post('/upload', async (req, res) =>{
  // console.log(req.files)
  const uploadedFiles =[]
  for (let i = 0; i < req.files.length; i++){
    const {path, originalname,mimetype} = req.files[i]
  //   const parts = originalname.split('.')
  //   const ext = parts[parts.length - 1]
  //   const newPath = path + '.' + ext
  //   fs.renameSync(path, newPath)
  //   uploadedFiles.push(newPath.replace('uploads\\', '') )
  const url = await  uploadToS3( path, originalname, mimetype)
  uploadedFiles.push(url)
  }
  // res.json(req.files)
  // const uploadedFiles = req.files.map((file) => {
  //   const { path, originalname, mimetype } = file
  //   // const parts = originalname.split('.')
  //   // const ext = parts[parts.length - 1]
  //   // const newPath =path + '.' + ext;
  //   // fs.renameSync(path, newPath)
  
  // //   return newPath.replace('uploads\\', '')
  // })
  
  res.json(uploadedFiles)
})
app.post('/backend/places', async (req, res)=>{
  mongoose.connect(process.env.MONGO_URL);
  // get the userId ie owner
  const { token } = req.cookies;
  // console.log(req.body.addedPhotos)
  const {title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, prices} = req.body
  jwt.verify(token, jwtSecret, {}, async (err, user) => {
    if (err) throw err;
  const placeData = await Places.create({
      owner: user.id,
      title, address, images:addedPhotos, description, perks, 
      extraInfo, checkIn, checkOut, maxGuests, prices

    })
    res.json(placeData)
  })
})
app.get('/backend/user-places', (req, res)=>{
  mongoose.connect(process.env.MONGO_URL);
  // get userId
  const { token } = req.cookies;
  // decrypt the token
  jwt.verify(token, jwtSecret, {}, async (err, user) =>{
    const {id} = user
    res.json( await Places.find({owner: id}))
  })

})
// retrieve places details for edit to the inputs
app.get('/backend/places/:id', async (req, res)=>{
  mongoose.connect(process.env.MONGO_URL);
  // res.json(req.params)
  const {id} = req.params
  res.json(await Places.findById(id))
})
// edit/ save updates on places
app.put('/backend/places/', async (req, res) =>{
  mongoose.connect(process.env.MONGO_URL);
  // get userId
  const { token } = req.cookies;
  const { id, title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, prices} = req.body
  jwt.verify(token, jwtSecret, {}, async (err, user) => {
    if (err) throw err;
    const placeData = await Places.findById(id)
    if (user.id === placeData.owner.toString()){
      placeData.set({
        title, address, images:addedPhotos, description, perks, 
        extraInfo, checkIn, checkOut, maxGuests, prices
      })
     await placeData.save()
      res.json('ok')
    }

  })
})
app.get('/backend/places', async (req, res) =>{
  mongoose.connect(process.env.MONGO_URL);
  res.json(await Places.find())
})

app.post('/backend/booking', async (req, res)=>{
  mongoose.connect(process.env.MONGO_URL);
  const userData = await getUserDataFromToken(req)
  const {place, checkin, checkout, guests, name, phone, price} = req.body
  try{
    const BookingData = await Booking.create({
      place,
      checkin, checkout, guests, name, phone, price, user:userData.id
    })
    res.json(BookingData)
  }catch(e){
    res.status(422).json('failed')
  }
})

app.get('/backend/booking', async (req, res)=>{
  mongoose.connect(process.env.MONGO_URL);
  const userData =  await getUserDataFromToken(req)
  res.json(await Booking.find({user: userData.id}).populate('place'))
})
app.listen(port);
