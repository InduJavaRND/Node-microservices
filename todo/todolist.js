require("dotenv").config();
const express = require('express');

// Connect
require('../db/db');

const Todo = require('./Todo');

const app = express();
const port = 5001;
app.use(express.json())

app.post('/todo', (req, res) => {
    const newTodo = new Todo({...req.body});
    newTodo.save().then(() => {
          res.send('New todo added successfully!')
    }).catch((err) => {
         res.status(500).send('Internal Server Error!');
    })
})

app.get('/todolist', (req, res) => {
   Todo.find().then((todolist) => {
        if (todolist.length !== 0) {
              res.json(todolist)
        } else {
            res.status(404).send('todo not found');
       }
    }).catch((err) => {
         res.status(500).send('Internal Server Error!');
    });
})
app.get('/todo/:id', (req, res) => {
     Todo.findById(req.params.id).then((todo) => {
        if (todo) {
           res.json(todo)
        } else {
            res.status(404).send('Todo not found');
        }
     }).catch((err) => {
        res.status(500).send('Internal Server Error!');
    });
})
app.delete('/todo/:id', (req, res) => {
    Todo.findOneAndRemove(req.params.id).then((todo) 	=> {
        if (todo) {
             res.json('Todo deleted Successfully!')
        } else {
            res.status(404).send('Todo Not found!'); 
        }
    }).catch((err) => {
         res.status(500).send('Internal Server Error!');
    });
});
app.listen(port, () => {
     console.log(`Up and Running on port ${port} - This is Todo service`);
})