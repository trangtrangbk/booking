const { requiredHotelOwner, requiredAdmin } = require("../../middlewares/auth");

const router = require("express").Router();

router.get("/overview",requiredHotelOwner,require("./getOverview"));
router.get("/bestSellerRoom",requiredHotelOwner,require("./getBestSeller"));
router.get("/yearData",requiredHotelOwner,require("./getYearData"));
router.get("/admin-overview",requiredAdmin,require("./getAdminOerview"));
router.get("/top-hotels",requiredAdmin,require("./topHotels"));
router.get("/location",requiredAdmin,require("./location"));

module.exports = { router };
