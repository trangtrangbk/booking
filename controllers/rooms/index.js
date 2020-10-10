const router = require("express").Router();

router.get("/",require("./getList"));
router.delete("/:id",require("./deleteRoom"));
router.post("/", require("./createRoom"));
router.get("/:id", require("./getRoomById"));
router.put("/:id", require("./updateRoom"));
module.exports = { router };
