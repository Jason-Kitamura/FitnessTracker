const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let workout = new Schema ({
   resistance : [ {type: Schema.Types.ObjectId, ref: 'resistance'} ],
   cardio : [ {type: Schema.Types.ObjectId, ref: 'cardio'} ],
} );

module.exports = mongoose.model('workout', workout);