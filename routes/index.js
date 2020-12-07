const {requiredAdmin } = require("../middlewares/auth");
const app = require("express")();

app.use("/admins",requiredAdmin, require("../controllers/admins").router);
app.use("/accounts", require("../controllers/accounts").router);
app.use("/hotels",require("../controllers/hotels").router);
app.use("/rooms", require("../controllers/rooms").router);
app.use("/reservations", require("../controllers/reservations").router);
app.use("/rating", require("../controllers/rating/index").router);
app.use("/stat", require("../controllers/statitics/index").router);
app.use("/", require("../controllers/auth"));

module.exports = app;
