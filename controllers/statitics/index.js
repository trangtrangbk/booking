const { requiredHotelOwner } = require("../../middlewares/auth");

const router = require("express").Router();

router.get("/overview",requiredHotelOwner,require("./getOverview"));
router.get("/bestSellerRoom",requiredHotelOwner,require("./getBestSeller"));
router.get("/yearData",requiredHotelOwner,require("./getYearData"));

module.exports = { router };
