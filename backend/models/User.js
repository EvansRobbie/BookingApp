const mongoose = require('mongoose')
const {Schema, model} = mongoose
//  create the user model to capture user details/credentials
const UserSchema = new Schema({
    name:String,
    email: {type: String, unique:true},
    password: String,
})

const UserModel = model('User', UserSchema)

module.exports = UserModel