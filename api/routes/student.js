const express = require('express');
const studentRoutes = express.Router();
const log4js = require('log4js');
log4js.configure({
  appenders: { mern: { type: 'file', filename: 'mern.log' } },
  categories: { default: { appenders: ['mern'], level: 'debug' } }
});
 
const logger = log4js.getLogger('mern');

// Require student model in our routes module
let Student = require('../models/student');

// Defined store route
studentRoutes.route('/add').post(function (req, res) {
  let student = new Student(req.body);
  student.save()
    .then(student => {
      res.status(200).json({'message': 'student is added successfully'}); 
      logger.info('Student added');    
    })
    .catch(err => {
      res.status(500).json({"Code":"DUPLICATE KEY", "message":err.errmsg});
      logger.error('Unable to add student');

    });
});

// Defined get data(index or listing) route
studentRoutes.route('/').get(function (req, res) {
    Student.find(function(err, students){
    if(err){
      logger.error('Unable to get data');
      console.log(err);
    }
    else {
      logger.info('get data is called');
      res.json(students);
    }
  });
});

// Defined edit route
studentRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Student.findById(id, function (err, student){
    logger.info('edit data called');
      res.json(student);
  });
});

//  Defined update route
studentRoutes.route('/update/:id').post(function (req, res) {
    Student.findById(req.params.id, function(err, student) {
    if (!student)
      res.status(404).send("data is not found");
    else {
        student.student_Id = req.body.student_Id;
        student.name = req.body.name;
        student.address = req.body.address;
        student.save().then(student => {
          logger.info('Student data updated');
          res.status(200).json({'message': 'student is updataed successfully'});
        })
      .catch(err => {
        logger.error('unable to update data');
            res.status(500).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
studentRoutes.route('/delete/:id').get(function (req, res) {
    Student.findByIdAndRemove({_id: req.params.id}, function(err, student){
        if(err) {
          logger.error('unble to delete data');
        res.json(err);
        }
        else {
          logger.info('student data deleted');
         res.json('Successfully removed');
        }
    });
});

module.exports = studentRoutes;