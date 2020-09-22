var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

router.use(express.json());

const User = require('../models/usermodel');

router.post('/register', (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        res.statusCode = 409;
        res.end('email already exists');

      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            err = new Error('Error');
            err.status = 500;
            return next(err);
          }
          else {
            const User = new User({
              _id: new mongoose.Types.ObjectId(),
              name: req.body.name,
              email: req.body.email,
              password: hash
            });
            User
              .save()
              .then(result => {
                console.log(result);
                res.end('successfully registered');
                res.statusCode = 200;
              }, (err) => next(err)
                .catch((err) => next(err)));
          }
        });
      }
    });
});
router.post('/login', (req, res, next) => {
  user.findOne({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {

        res.statuscode = 401;
        res.end('user does not exist');
      }
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          err = new Error('Error');
          err.status = 500;
          return next(err);

        }
        if (result) {
          res.end('Logged in successfully');
          res.statusCode = 200;
        }
        res.statusCode = 401;
        res.end('Authentication failed');
      });
    })
    /* GET users listing. */
    //router.get('/', function (req, res, next) {
    // res.send('respond with a resource');
    //});
    .catch((err) => next(err));
});
module.exports = router;
