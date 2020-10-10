const Reservation = require("../models/reservation");

const insertReservation = async (reservation) => {
  const r = new Reservation(reservation);
  const result = await r.save();
  return result;
};
const getReservation = async (params) => {
  return await Reservation.findOne(params);
};

const getReservations = async () => {
  return await Reservation.find();
};
const deleteReservationById = async (id) => {
  return await Reservation.findByIdAndDelete(id);
};

const updateReservation = async (id, reservation) => {
  return await Reservation.findByIdAndUpdate(id, reservation, { new: true });
};

module.exports = {
  insertReservation,
  getReservation,
  getReservations,
  deleteReservationById,
  updateReservation,
};
