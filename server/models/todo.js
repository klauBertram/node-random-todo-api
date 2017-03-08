const mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
  completed: {
    type: Boolean,
    default: false,
  },
  completedAt: {
    type: Number,
    default: null
  },
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
});

module.exports = {
  Todo
}