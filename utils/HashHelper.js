const crypto = require("crypto");
const DEFAULT_LENGHT = 24;

const getHashString = (sourceString, saltString) => {
  return crypto
    .createHash("sha256")
    .update(sourceString + saltString)
    .digest("hex")
    .toString();
};

const getRandomString = (length = DEFAULT_LENGHT) => {
  return crypto.randomBytes(length).toString("hex");
};

module.exports = { getHashString, getRandomString };
