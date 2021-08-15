const express = require('express');
const passport = require('passport');

const adminPassport = require('../passports/adminPassport');
const userPassport = require('../passports/usersPassport');

passport.use('admin', adminPassport);
passport.use('user', userPassport);

const {
    getAll,
    getById,
    postAdd,
    deleteContact,
    patchContact
} = require('./controller');

const contactsRouter = express.Router();

contactsRouter.get('/', passport.authenticate('user', {session: false}), getAll);
contactsRouter.post('/', passport.authenticate('user', {session: false}), postAdd);
contactsRouter.post('/:id', passport.authenticate('user', {session: false}), getById);
contactsRouter.delete('/:id', passport.authenticate('admin', {session: false}), deleteContact);
contactsRouter.patch('/:id', passport.authenticate('admin', {session: false}), patchContact);

module.exports = contactsRouter;
