const { statusCodes } = require("../constants/http-statu-codes");
const { receiptService } = require("../service/receipt-service");
const { receiptValidtaor } = require("./validator/receipt-validator");


class ReceiptHandler {

    async createReceiptOnGoods(request, response) {
        try {
            const payload = request.body;
            const InValidDataMessages = await receiptValidtaor.validateReceiptPayload(payload);

            if (InValidDataMessages.length == 0) {
                const receiptResponse = await receiptService.createReceipt(payload);

                response.status(statusCodes.OK).json({
                    messages: receiptResponse
                })
            } else {
                response.status(statusCodes.BAD_REQUEST).json({
                    messages: InValidDataMessages
                })
            }

        } catch (error) {
            throw error;
        }

    }
}

const receiptHandler = new ReceiptHandler();
module.exports = { receiptHandler };