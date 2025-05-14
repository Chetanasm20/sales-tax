
const { response } = require("../../mock/response");
const { receiptService } = require("../../service/receipt-service");
const { receiptHandler } = require("../receipt-handler");

describe('Test cases for receipt handler', () => {

    it('should create a receipt successfully', async () => {
        const mockRequest = {

            body: ['1 book at 12.49', '1 music CD at 14.99']
        };

        receiptService.createReceipt = jest.fn().mockResolvedValue([
            '1 book: 12.49',
            '1 music CD: 16.49',
        ]);

        await receiptHandler.createReceiptOnGoods(mockRequest, response);

        expect(response.responseStatus).toBe(200);
        expect(response.body.messages[0]).toBe('1 book: 12.49')
    });

    it('test when input is empty', async () => {
        const mockRequest = {
            body: []
        };

        receiptService.createReceipt = jest.fn().mockResolvedValue(null);
        await receiptHandler.createReceiptOnGoods(mockRequest, response);
        console.log(response.body);
        expect(response.responseStatus).toBe(400);
        expect(response.body.messages[0]).toBe('Payload is Empty, Please provide input')
    });

})