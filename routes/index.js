const { requiredLogin } = require("../middlewares/auth");
const app = require("express")();

app.use("/accounts", require("../controllers/accounts").router);
app.use("/hotels", requiredLogin,require("../controllers/hotels").router);
app.use("/rooms",requiredLogin, require("../controllers/rooms").router);
app.use("/reservations", require("../controllers/reservations").router);
app.use("/", require("../controllers/auth"));

module.exports = app;
