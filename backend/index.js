const express = require("express");
const app = express();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const imageDownloader = require('image-downloader')
const User = require("./models/User");
require("dotenv").config();
const port = 4000;

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "ffjhgjhbjbgsjhkgdywdhkljklcjklhjbjkbjknjk";

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
// console.log(process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL);
app.get("/test", (req, res) => {
  res.json("test Ok");
});
app.post("/register", async (req, res) => {
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
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userData = await User.findOne({ email });
  if (userData) {
    const passOk = bcrypt.compareSync(password, userData.password);
    if (passOk) {
      jwt.sign(
        { email: userData.email, id: userData._id},
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
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

app.get("/profile", (req, res) => {
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
console.log(__dirname)
app.post('/upload-by-link', async (req, res) =>{
  const {link} = req.body
  const newName = 'photo' + Date.now() + '.jpg'
  await imageDownloader.image({
    url: link,
    dest: __dirname +'/uploads/'+newName,
  })
  res.json(newName)
})
app.listen(port);
