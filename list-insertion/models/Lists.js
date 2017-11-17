var mongoose = require('mongoose');

var ListSchema = new mongoose.Schema({
  content: String
});

mongoose.model('List', ListSchema);
