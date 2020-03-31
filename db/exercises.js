const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let exercises = new Schema ({
   type :  { type: String, trim: true, required: true, },
   name :  { type: String, trim: true, required: true, },
   duration : {type: Number, default : 0},
   weight : { type: Number },
   reps : { type: Number },
   sets : { type: Number },
   distance : {type : Number },
} );

module.exports = mongoose.model('exercises', exercises);