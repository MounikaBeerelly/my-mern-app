const mongoose =require('mongoose');
const Schema = mongoose.Schema;

// create a schema
const StudentSchema =new Schema({
  student_Id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('student', StudentSchema);