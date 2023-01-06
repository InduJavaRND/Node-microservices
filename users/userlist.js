require("dotenv").config();
const express = require('express');

// Connect
require('../db/db');

const user = require('./user');

const app = express();
const port = 5000;
app.use(express.json())

app.post('/user', (req, res) => {
    const newUser = new user({...req.body});
    newUser.save().then(() => {
       res.send('New user created successfully!');
    }).catch((err) => {
        res.status(500).send('Internal Server Error!');
    })
})

app.get('/userlist', (req, res) => {
    user.find().then((users) => {
         if (users.length !== 0) {
               res.json(users)
         } else {
             res.status(404).send('User not found');
        }
     }).catch((err) => {
          res.status(500).send('Internal Server Error!');
     });
 })

app.get('/userlist/:id', (req, res) => {
    user.findById(req.params.id).then((users) => {
     if (user) {
          res.json(users)
      } else {
          res.status(404).send('user not found');
      }
    }).catch((err) => {
          res.status(500).send('Internal Server Error!');
   });
})

app.delete('/userlist/:id', (req, res) => {
    user.findByIdAndRemove(req.params.id).then((user) => {
    if (user) {
         res.json('user deleted Successfully!')
      } else {
         res.status(404).send('user Not Found!');
      }
    }).catch((err) => {
       res.status(500).send('Internal Server Error!');
  });
});

app.listen(port, () => {
    console.log(`Up and Running on port ${port}- This is User service`);
})