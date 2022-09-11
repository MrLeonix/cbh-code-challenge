const { deterministicPartitionKey } = require("./dpk");
const { extractPartitionKeyFromEvent } = require('./partitionKey');

jest.mock('./partitionKey');

describe("deterministicPartitionKey", () => {
  it("Ensures partition key is extracted", () => {
    // given, when
    deterministicPartitionKey();

    // then
    expect(extractPartitionKeyFromEvent).toBeCalled();
  });
});
