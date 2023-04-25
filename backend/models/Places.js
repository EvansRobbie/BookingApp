const {Schema, model} = require('mongoose')

const placeSchema = new Schema({
    owner:{type: Schema.Types.ObjectId, ref:'User'},
    title:String,
    address: String,
    images: [String],
    description: String,
    perks: [String],
    extraInfo: String,
    checkIn: Number,
    CheckOut:Number,
    maxGuests: Number,
})

const PlaceModel = model('Places', placeSchema)

module.exports = PlaceModel