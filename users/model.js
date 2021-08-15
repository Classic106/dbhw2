const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersScheme = new Schema({
  _id: {type: mongoose.Schema.ObjectId, select: false, auto: true},
  login: String,
  email: String,
  password: String
}, {versionKey: false});

const Users = mongoose.model("Users", usersScheme);

function listUsers() {
  return Users.find({})
    .then(users => users)
    .catch(err => err);
}

async function regUsers(body) {
    const hash = await bcrypt.hash(body.password, saltRounds);
        body.password = hash;
    const user = new Users(body);

    return user.save().then(async user => ({
      user, token: jwt.sign({_id: user._id}, secret)
    }));
}

function logUsers(body) {

  return Users.findOne({login: body.login})
    .then(async user => {
      console.log(user)
        if(!user) return new Error("User not found");

        const compare = await bcrypt.compare(body.password, user.password);
       
        return (compare) ? {
            user, token: jwt.sign({id: user._id}, secret, {
              expiresIn: 3600 * 24,
            }),
        } : new Error('Wrong password');
    })
    .catch(err => err);
}

module.exports = {
    listUsers,
    regUsers,
    logUsers,
    Users
}
