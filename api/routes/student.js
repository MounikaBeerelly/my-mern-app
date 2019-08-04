const express = require('express');
const studentRoutes = express.Router();

// Require student model in our routes module
let Student = require('../models/student');

// Defined store route
studentRoutes.route('/add').post(function (req, res) {
  let student = new Student(req.body);
  student.save()
    .then(student => {
      res.status(200).json({'message': 'student is added successfully'});
    })
    .catch(err => {
      res.status(500).json({"Code":"DUPLICATE KEY", "message":err.errmsg});

    });
});

// Defined get data(index or listing) route
studentRoutes.route('/').get(function (req, res) {
    Student.find(function(err, students){
    if(err){
      console.log(err);
    }
    else {
      res.json(students);
    }
  });
});

// Defined edit route
studentRoutes.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Student.findById(id, function (err, student){
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
          res.status(200).json({'message': 'student is updataed successfully'});

        })
      .catch(err => {
            res.status(500).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
studentRoutes.route('/delete/:id').get(function (req, res) {
    Student.findByIdAndRemove({_id: req.params.id}, function(err, student){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = studentRoutes;