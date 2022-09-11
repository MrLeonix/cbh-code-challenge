const { extractPartitionKeyFromEvent } = require('./partitionKey');

/**
 * @param {object} event - The received event.
 * @returns {string} The deterministic partition key.
 */
exports.deterministicPartitionKey = (event) => extractPartitionKeyFromEvent(event);
