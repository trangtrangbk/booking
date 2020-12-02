const router = require("express").Router();

router.get("/",require("./getList"));
router.post("/", require("./createRating"));
module.exports = { router };
