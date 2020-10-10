const router = require("express").Router();

router.get("/",require("./getList"));
router.delete("/:id",require("./deleteHotel"));
router.post("/", require("./createHotel"));
router.get("/:id", require("./getHotelById"));
router.put("/:id", require("./updateHotel"));

module.exports = { router };
