require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require('passport');

const Users = require('./users/routes');
const Contacts = require('./contacts/routes');

/*
.env settings
  PORT=3000
  DB="mongodb://localhost:27017/usersdb"
  SECRET="secret"
*/

mongoose.connect(process.env.DB,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
  }, 
  function(err){
    if(err) return console.log(err);
    app.listen(process.env.PORT, ()=>{
    console.log('Server opened on port '+process.env.PORT);
  });
});

const app = express();

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.use('/users', Users);
app.use('/contacts', Contacts);
