const mongoose =require('mongoose');
const unique = require('mongoose-unique-validator');
const validate = require('mongoose-validator');
mongoose.set('useCreateIndex', true);


const student_IdValidator = [
  validate({
    validator: 'isLength',
    arguments: [0, 4],
    message: 'Name must not exceed {ARGS[1]} characters.'
  })
];
const nameValidator = [
  validate({
    validator: 'isLength',
    arguments: [0, 40],
    message: 'Name must not exceed {ARGS[1]} characters.'
  })
];
const addressValidator = [
  validate({
    validator: 'isLength',
    arguments: [0, 40],
    message: 'Address must not exceed {ARGS[1]} characters.'
  })
];

const Schema = mongoose.Schema;


// Define collection and schema for Student
let Student = new Schema({
  student_Id: {
    type: Number, 
    required: [true, 'Id id required.'],
    unique: true,
    validate: student_IdValidator
  },
  name: {
    type: String,
    required: [true, 'Name is required.'],
    validate: nameValidator
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    validate: addressValidator
  }, 
},{
    collection: 'student'
});

Student.plugin(unique, { message: 'That {PATH} is already taken.' });
module.exports = mongoose.model('Student', Student);