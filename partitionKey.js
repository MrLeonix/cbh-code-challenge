const { createHashOutOfData } = require('./cryptography');

/**
 * @param {object} event The event to extract the partition key from.
 * @returns {string} The extracted partition key.
 */
exports.extractPartitionKeyFromEvent = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  if (!event) return TRIVIAL_PARTITION_KEY;

  const { partitionKey } = event;
  if (!partitionKey) return createHashOutOfData(JSON.stringify(event));

  const candidate = typeof partitionKey !== 'string' ?
    JSON.stringify(partitionKey) :
    partitionKey;
    
  return candidate.length > MAX_PARTITION_KEY_LENGTH ?
    createHashOutOfData(candidate) :
    candidate;
}
