const { receiptValidtaor } = require("../validator/receipt-validator");

describe('Test cases for receipt validator', () => {        
    
    it('should return empty array when input is valid', async () => {
        const payload = ['1 book at 12.49', '1 music CD at 14.99'];
        const result = await receiptValidtaor.validateReceiptPayload(payload);
        expect(result).toEqual([]);
    });

    it('should return error message when input is empty', async () => {
        const payload = [];
        const result = await receiptValidtaor.validateReceiptPayload(payload);
        
        expect(result).toEqual(['Payload is Empty, Please provide input']);
    });

    it('should return error message when input null', async () => {
        const payload = [];
        const result = await receiptValidtaor.validateReceiptPayload(null);
        
        expect(result).toEqual(['Payload is Empty, Please provide input']);
    });

    it('should return error message when input undefined', async () => {
        const payload = [];
        const result = await receiptValidtaor.validateReceiptPayload(undefined);
        
        expect(result).toEqual(['Payload is Empty, Please provide input']);
    });
    it('should return error message when input is mepty string', async () => {
        const payload = [];
        const result = await receiptValidtaor.validateReceiptPayload(undefined);
        
        expect(result).toEqual(['Payload is Empty, Please provide input']);
    });
    it('should return error message when input data type is other than array', async () => {
        const payload = "other than array";
        const result = await receiptValidtaor.validateReceiptPayload(undefined);
        
        expect(result).toEqual(['Payload is Empty, Please provide input']);
    });
})