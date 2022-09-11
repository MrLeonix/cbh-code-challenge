const crypto = require("crypto");
const { createHashOutOfData } = require('./cryptography')

jest.mock("crypto", () => ({
    createHash: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    digest: jest.fn().mockReturnThis()
}));

describe('createHashOutOfData', () => {
    it('Creates a hashes out of received data using the right algorithm and encoding', () => {
        // given
        const testData = "abc";

        // when
        createHashOutOfData(testData);

        // then
        expect(crypto.createHash).toBeCalledWith("sha3-512");
        expect(crypto.update).toBeCalledWith(testData);
        expect(crypto.digest).toBeCalledWith("hex");
    })
})