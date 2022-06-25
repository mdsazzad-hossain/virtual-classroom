const mongoose = require('mongoose')
const Schema = mongoose.Schema

const teacherSchema = new Schema({
  name: {
    type: String,
    min: 1, 
    max: 50,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Teacher', teacherSchema);