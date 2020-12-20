const Room = require("../models/room");

const insertRoom = async (room) => {
  const r = new Room(room);
  const result = await r.save();
  return result;
};
const getRoom = async (params) => {
  return await Room.findOne(params);
};

const getRooms = async (filter = {},limit, offset,sort) => {
  const count = await Room.count(filter)
  const rooms =  await Room.find(filter).sort(sort).skip(offset).limit(limit);
  return {
    rooms,
    count
  }
}
const deleteRoomById = async (id) => {
  return await Room.findByIdAndDelete(id);
};

const updateRoom = async (id, room) => {
  return await Room.findByIdAndUpdate(id, room, { new: true });
};

module.exports = {
  insertRoom,
  getRoom,
  getRooms,
  deleteRoomById,
  updateRoom,
};
