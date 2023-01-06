require("dotenv").config();
const express = require('express');
const mongoose = require("mongoose");
const axios = require('axios');

// Connect
require('../db/db');

const task = require('./tasks');

const app = express();
const port = 9000;
app.use(express.json())
app.post('/task', (req, res) => {
   const newtask = new task({
   userID: mongoose.Types.ObjectId(req.body.userID),
   todoID: mongoose.Types.ObjectId(req.body.todoID),
   taskTitle: req.body.task
});
newtask.save().then(() => {
   res.send('New Task added successfully!')
  }).catch((err) => {
   res.status(500).send('Internal Server Error!');
  })
})
app.get('/task', (req, res) => {
   task.find().then((task) => {
      if (task) {
          res.json(task)
       } else {
          res.status(404).send('task not found');
       }
   }).catch((err) => {
          res.status(500).send('Internal Server Error!');
   });
})

app.get('/task/:id', (req, res) => {
    task.findById(req.params.id).then((task) => {
       if (task) {
          axios.get(`http://localhost:5000/userlist/${task.userID}`).then((response) => {
         let TaskObject = { 
           userName: response.data.name, 
          }
        axios.get(`http://localhost:5001/todo/${task.todoID}`).then((response) => {
         TaskObject.Title = response.data.title 
         TaskObject.taskTitle= task.taskTitle 
         res.json(TaskObject);
        })
        
   })	
     } else {
        res.status(404).send('task not found');
     }
    }).catch((err) => {
        res.status(500).send('Internal Server Error!');
   });
}) 

app.listen(port, () => {
     console.log(`Up and Running on port ${port} - This is Task service`);
})