const crypto = require("crypto");

const ALGORITHM = "sha3-512";
const ENCONDING = "hex";

/**
 * @param {string} data The data to be hashed.
 * @returns {string} The hashed data.
 */
exports.createHashOutOfData = (data) =>
    crypto.createHash(ALGORITHM).update(data).digest(ENCONDING);
