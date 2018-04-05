var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StructureSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  jsonstring: {
    type: String,
    required: true
  },
  stream: { 
    type: Schema.Types.ObjectId, 
    ref: 'Stream' 
  },
  createdAt: {
    type: Date, 
    default: Date.now
  }
});

module.exports = mongoose.model('Structure', StructureSchema);