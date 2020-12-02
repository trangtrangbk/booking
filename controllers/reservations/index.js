const router = require("express").Router();

router.get("/",require("./getList"));
router.get("/filter",require("./getFilterList"));
router.delete("/:id",require("./deleteReservation"));
router.post("/", require("./createReservation"));
router.put("/:id", require("./updateReservation"));
router.get("/:id", require("./getReservationById"));
router.post("/checkdate", require("./checkValidDate"));
router.post("/mail", require("./mailAfterOrder"));

module.exports = { router };
