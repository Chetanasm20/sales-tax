

const express = require('express');
const { receiptHandler } = require('../handler/receipt-handler');

const receiptRoute = express.Router({ mergeParams: true });
module.exports = receiptRoute;

receiptRoute.post('/', (request, response) => {
    
receiptHandler.createReceiptOnGoods(request, response)
});

