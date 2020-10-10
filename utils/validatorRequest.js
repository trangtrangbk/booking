const isEmptyBody = req => {
  if (Object.keys(req.body).length === 0) return true;
  return false;
};

const hasAnyFieldEmpty = data => {
  const keys = Object.keys(data);
  return keys.some(x => {
    if (typeof data[x] === "String") return data[x].trim().length === 0;
  });
};

const isValidObjectId = id => /^[0-9a-fA-F]{24}$/.test(id);

module.exports = { isEmptyBody, hasAnyFieldEmpty, isValidObjectId };
