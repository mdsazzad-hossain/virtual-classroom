const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    min: 1, 
    max: 50,
    required: true
  },
  student_id: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    min: 4,
    max: 8,
    required: true
  },
  type: {
    type: String,
    default: 'user',
    required: false,
  },
  classId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false
  }
});

module.exports = mongoose.model('User', userSchema);