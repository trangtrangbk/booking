const Hotel = require("../models/hotel");

const insertHotel = async (hotel) => {
  const h = new Hotel(hotel);
  const result = await h.save();
  return result;
};
const getHotel = async (params) => {
  return await Hotel.findOne(params);
};

const getHotels = async () => {
  return await Hotel.find();
};
const deleteHotelById = async (id) => {
  return await Hotel.findByIdAndDelete(id);
};

const updateHotel = async (id, hotel) => {
  return await Hotel.findByIdAndUpdate(id, hotel, { new: true });
};

module.exports = {
  insertHotel,
  getHotel,
  getHotels,
  deleteHotelById,
  updateHotel,
};
