const router = require("express").Router();

router.get("/",require("./getList"));
router.delete("/:id",require("./deleteReservation"));
router.post("/", require("./createReservation"));
router.put("/:id", require("./updateReservation"));
router.get("/:id", require("./getReservationById"));

module.exports = { router };
