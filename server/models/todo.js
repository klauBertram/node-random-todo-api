const mongoose = require('mongoose');

let Todo = mongoose.model('Todo', {
  completed: {
    type: Boolean,
    default: false,
  },
  completedAt: {
    type: Number,
    default: null
  },
  rank: {
    type: Number,
    default: () => {
      return Math.floor((Math.random() * 1000000) + 1);
    }
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