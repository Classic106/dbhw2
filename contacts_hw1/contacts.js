const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactsScheme = new Schema({
  _id: {type: mongoose.Schema.ObjectId, select: false, auto: true},
  name: String,
  email: String,
  password: String
}, {versionKey: false});

const Contacts = mongoose.model("Contact", contactsScheme);

function listContacts() {
  return Contacts.find({})
    .then(contacts => contacts)
    .catch(err => err);
}

async function regContacts(body) {
    const hash = await bcrypt.hash(body.password, saltRounds);
        body.password = hash;
    const contact = new Contacts(body);

    return contact.save().then(async u => jwt.sign({_id: u._id}, secret));
}

async function logContacts(body, auth) {
   if(auth) {
    const { _id } = await jwt.verify(auth, secter);

    return Contacts.find({ _id })
    .then(contact => {
       return (contact.length !== 1) ? contact : new Error("Error");

    })
    .catch(err => err);
    }
console.log(body)
  return Contacts.find({name: body.name})
    .then(async contact => {
        if(contact.length !== 1) return new Error("Error");
        const compare = await bcrypt.compare(body.password, contact[0].password);
       console.log(compare)
        return (compare) ? contact : new Error('Error');
    })
    .catch(err => console.log(err));
}

module.exports = {
    listContacts,
    regContacts,
    logContacts
}

/*function getContactById(contactId) {
  return Contacts.find({id: +contactId})
    .then(contacts => contacts)
    .catch(err => err);
}

function removeContact(contactId) {
  return Contacts.deleteOne({id: +contactId}).
    then(contact => contact)
    .catch(err => err);
}

async function addContact(body) {

    const contact = await Contacts.find({})
      .limit(1)
      .sort({$natural: -1})
      .then(contact => contact[0])
      .catch(err => err);

    const newBody = new Contacts({ id: contact.id+1 , ...body });

    return newBody.save({ writeConcern: { w: "majority", wtimeout: 5000 } })
      .then(contact => contact)
      .catch(err => err);
}

function UpdateContact(id, body) {
  return Contacts.findOneAndUpdate({id}, body, {new: true});
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  UpdateContact,
};*/
