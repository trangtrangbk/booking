const Hotel = require("../models/hotel");

const insertHotel = async (hotel) => {
  const h = new Hotel(hotel);
  const result = await h.save();
  return result;
};
const getHotel = async (params) => {
  return await Hotel.findOne(params);
};

const getHotels = async (filter = {},limit, offset) => {
  const count = await Hotel.count(filter)
  const hotels =  await Hotel.find(filter).skip(offset).limit(limit);
  return {
    hotels,
    count
  }
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
