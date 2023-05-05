const {model, Schema} = require('mongoose')

const BookingSchema = new Schema({
    place: {type:Schema.Types.ObjectId, require:true},
    checkin: {type:Date, require:true},
    checkout: {type:Date, require:true},
    guests: {type:Number, required:true},
    name: {type: String, required:true},
    phone: {type: String, required:true},
    price:String,
})

const BookingModel = model('Booking', BookingSchema)
module.exports = BookingModel