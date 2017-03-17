const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const mongoose = require('mongoose');
const validator = require('validator');

let UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

// mongoose middleware
UserSchema.pre('save', function(next){
  let user = this;

  if(user.isModified('password')){
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;

        next();
      });
    });
  } else {
    next();
  }
});

/* override mongoose toJSON method so that we only
 * return the id and email, and exclude password and tokens
 * using es5 function to bind with 'this' keyword
 */
UserSchema.methods.toJSON = function(){
  let user = this;
  // converts mongoose obj to generic obj
  let userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
}

// custom methods
// using es5 function to bind with 'this' keyword
UserSchema.methods.generateAuthToken = function(){
  let user = this;
  let access = 'auth';
  let token = jwt.sign({
    _id: user._id.toHexString(),
    access
  }, process.env.JWT_SECRET)
  .toString();

  user.tokens.push({
    access,
    token
  });

  return user.save().then((user) => {
    return token;
  });
}

let User = mongoose.model('User', UserSchema);

module.exports = {
  User
}