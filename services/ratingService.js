const Rating = require("../models/ratings");

const insertRating = async (rating) => {
  const r = new Rating(rating);
  const result = await r.save();
  return result;
};
const getRatings = async (filter = {}) => {
  return await Rating.find(filter);
};

module.exports = {
  insertRating,
  getRatings,
};
