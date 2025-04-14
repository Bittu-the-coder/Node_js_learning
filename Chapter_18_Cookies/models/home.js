const mongoose = require('mongoose');
const Favourite = require('./favourite');
const Schema = mongoose.Schema;
/*
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
    this.description = description;
    this._id = _id;

    method: save()
    method: static fetchAll()
    method:   static findById(homeId)
    method: static deleteById(homeId)
*/

const homeSchema = new Schema({
  houseName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  photoUrl: {
    type: String,
  },
  description: {
    type: String,
  },
})


homeSchema.pre(
  'findOneAndDelete', async function (next) {
    const homeId = this.getQuery()._id;
    const home = await this.model.findById(homeId);
    await Favourite.deleteMany({ homeId: homeId });
    next()
  }
)

const Home = mongoose.model('Home', homeSchema);
module.exports = Home;