const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favouriteSchema = new Schema({
  homeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Home',
    required: true,
    unique: true,
  }
});

const Favourite = mongoose.model('Favourite', favouriteSchema);
module.exports = Favourite;