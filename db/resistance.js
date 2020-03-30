const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let resistance = new Schema ({
   type :  { type: String, trim: true, required: true, },
   name :  { type: String, trim: true, required: true, },
   duration : {type: Number},
   weight : { type: Number },
   reps : { type: Number },
   sets : { type: Number },
} );

module.exports = mongoose.model('resistance', resistance);