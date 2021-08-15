require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
/*
.env settings
  PORT=3001
  DB="mongodb://localhost:27017/contacts"
*/

const {
  listContacts,
    regContacts,
    logContacts
} = require("./contacts");

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

app.use(express.json());

const CheckId = (req, res) => {
  if (Number.isNaN(Number(req.params.contactId))) {
    res.status(400);
    res.send({ message: "Wrong contactId" });
  }
}

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/contacts", async (req, res) => {
  res.send(await listContacts());
});

app.post("/contacts/reg",
  (req, res, next) => {
    if (req.headers["content-type"] !== "application/json") {
      res.status(400);
      res.send({ message: "bad content-type" });
    }
    else if (!req.body.name) {
      res.status(400);
      res.send({ message: "missing required name field" });
    }
    else if (!req.body.email) {
      res.status(400);
      res.send({ message: "missing required email field" });
    }
    else if (!req.body.password) {
      res.status(400);
      res.send({ message: "missing required password field" });
    }
    else next();
  },
  async (req, res) => {

    try {
      const newContact = await regContacts(req.body);

      if (newContact instanceof Error) throw Error(newContact);
      else res.status(201).send(newContact);
    } catch(err) {
      res.status(400);
      res.send({ message: err.toString() });
    }
  }
);

app.post("/contacts/log",
  (req, res, next) => {
    if (!req.body.name) {
      res.status(400);
      res.send({ message: "missing required name field" });
    }
    else if (!req.body.password) {
      res.status(400);
      res.send({ message: "missing required password field" });
    }
    else next();
  },
  async (req, res) => {

    try {
      const newContact = await logContacts(req.body, req.headers.auth);

      if (newContact instanceof Error) throw Error(newContact);
      else res.status(201).send(newContact);
    } catch(err) {
      res.status(400);
      res.send({ message: err.toString() });
    }
  }
);

app.get('/admin', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    console.log(err, user, info);
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/users/' + user.username);
    });
  })(req, res, next);
});
/*app.get("/contacts/:contactId",
  async (req, res) => {

    CheckId(req, res);
    
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (contact.length !== 0) res.send(contact[0]);
    else {
      res.status(404);
      res.send({ message: "Contact not found" });
    }
  }
);

app.patch("/contacts/:contactId",
  (req, res, next) => {
    if (req.headers["content-type"] !== "application/json"){
      res.status(400);
      res.send({ message: "bad content-type" });
    }
    else if (Number.isNaN(Number(req.params.contactId))){
      res.status(400);
      res.send({ message: "Contact not found" });
    }
    else next();
  },
  async (req, res) => {
    
    CheckId(req, res);

    try{
      const { contactId } = req.params;
      const contact = await UpdateContact(contactId, req.body);
  
      if (contact instanceof Error) throw new Error(contact);
      else{
        if (contact) res.send({ message: "Contact updated" });
        else {
          res.status(404);
          res.send({ message: "Contact not found" });
        }
      }
    }catch(err) {
      res.status(400);
      res.send({ message: err.toString() });
    }
});

app.delete("/contacts/:contactId", async (req, res) => {

    CheckId(req, res);
    
    try{
      const { contactId } = req.params;
      const contact = await removeContact(contactId);
  
      if (contact instanceof Error) throw new Error(contact);
      else {

        if (contact) res.send({ message: "Contact deleted" });
        else {
          res.status(404);
          res.send({ message: "Contact not found" });
        }
      }
    }catch(err) {
      res.status(400);
      res.send({ message: err.toString() });
    }
  }
);*/
