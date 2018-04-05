var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  category:{
    type: String, 
    required: false, 
    enum: ['Personal', 'Work', 'Reserved'], 
    default: 'Personal'
  },
  user: { 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  },
  createdAt: {
    type: Date, 
    default: Date.now
  }
});

module.exports = mongoose.model('Project', ProjectSchema);
