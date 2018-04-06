var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StreamSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project'
  },
  structures:[
    {
      type: Schema.Types.ObjectId,
      ref: 'Structure'
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Stream', StreamSchema);
