const { requiredHotelOwner } = require("../../middlewares/auth");

const router = require("express").Router();

router.get("/",require("./getList"));
router.delete("/:id",requiredHotelOwner,require("./deleteRoom"));
router.post("/",requiredHotelOwner, require("./createRoom"));
router.get("/:id", require("./getRoomById"));
router.put("/:id",requiredHotelOwner, require("./updateRoom"));
module.exports = { router };
