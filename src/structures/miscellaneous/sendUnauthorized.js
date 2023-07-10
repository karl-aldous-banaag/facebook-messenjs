const sendUnauthorized = (res) => res.status(403).send("Unauthorized.");

module.exports = sendUnauthorized;