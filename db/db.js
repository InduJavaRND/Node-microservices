const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@cluster0.yhr52.mongodb.net/?retryWrites=true&w=majority', { 
    
}).then(() => {
     console.log('Connection successful!');
}).catch((e) => {
    console.log(e);
     console.log('Connection failed!');
})