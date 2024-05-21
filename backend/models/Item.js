const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  time: {
    type: Number, // Use Number to represent time in minutes
    required: true,
  },
});

module.exports = mongoose.model("Item", ItemSchema);
