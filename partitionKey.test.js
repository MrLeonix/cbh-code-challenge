const { extractPartitionKeyFromEvent } = require("./partitionKey");

describe("extractPartitionKeyFromEvent", () => {
  it("Returns the literal '0' when given no input", () => {
    // given, when
    const trivialKey = extractPartitionKeyFromEvent();

    // then
    expect(trivialKey).toBe("0");
  });

  it("Returns the event partition key when it is present", () => {
    // given
    const event = { partitionKey: 10 };

    // when
    const trivialKey = extractPartitionKeyFromEvent(event);

    // then
    expect(trivialKey).toBe("10");
  });

  it.each([
    ["Int", 10, "10"],
    ["Float", 5.5, "5.5"],
    ["String", "Some text", "Some text"],
    ["Date", new Date(2022,8,11,23,0,0,0), "\"2022-09-11T21:00:00.000Z\""],
    ["Array", [0, "A", 2.5, {}], "[0,\"A\",2.5,{}]"],
    ["Object", {}, "{}"]
  ])("Correctly returns the event partition key when type is %s", (_, data, expectedData) => {
    // given
    const event = { partitionKey: data };

    // when
    const trivialKey = extractPartitionKeyFromEvent(event);

    // then
    expect(trivialKey).toBe(expectedData);
  });

  it("Returns a hashed value when event partition key length is bigger than 256 caharacters", () => {
    // given
    const trivialKey = extractPartitionKeyFromEvent({ partitionKey: 'z'.repeat(300) });

    // when
    expect(trivialKey.length).toBe(128);

    // then
    expect(trivialKey).not.toBe('z'.repeat(128));
  });

  it("Returns a hashed value when event has no partition key", () => {
    // given
    const event = { type: 'shift_accepted' };

    // when
    const trivialKey = extractPartitionKeyFromEvent(event);

    // then
    expect(trivialKey).not.toBe('{"type":"shift_accepted"}');
  });
});
