const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

const PORT = process.env.PORT || 8000;


const app = express();

app.use(bodyParser.json());
// Import Routes
const postsRoute = require('./routes/posts');

const authRoute = require('./routes/auth');

app.use('/posts',postsRoute);

//Route Middleware
app.use('/api/user', authRoute);

// Connect To DB
mongoose.connect(process.env.DB_CONNECTION,(err) => {
    console.log(process.env.DB_CONNECTION);
    if (err) {
        console.error(err);
    } else {
        console.log('[mongo connected]');
    }
});

// How to we start listen to the server
app.listen(PORT, () => {
    console.log(`Express running on port ${PORT}`)
});


