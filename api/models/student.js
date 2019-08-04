const mongoose =require('mongoose');

const Schema = mongoose.Schema;

// Define collection and schema for Student
let Student = new Schema({
  student_Id: {
    type: Number
  },
  name: {
    type: String
  },
  address: {
    type: String
  }, 
},{
    collection: 'student'
});

module.exports = mongoose.model('Student', Student);