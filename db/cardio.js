const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let cardio = new Schema ({
   type :  { type: String, trim: true, required: true, },
   name :  { type: String, trim: true },
   duration : {type: Number},
   distance : { type : Number }
} );

module.exports = mongoose.model('cardio', cardio);