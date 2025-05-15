const { receiptConstants } = require("../constants/receipt-constants");
const { exemptGoods, taxValues } = require("../master-data/goods-mster-data");

class ReceiptService {
    async createReceipt(inputs) {

        try {
            const baseTax = taxValues.baseTax;
            const importDuty = taxValues.importDuty;
            let totalTax = 0;
            let totalAmount = 0;
            let receipt = [];
           
            inputs.forEach(input => {
                const items = this.convertToGoodsBrakeUps(input);
                const receiptAtItems=[]
                items.forEach(item => {
                    let tax = 0;
                    if (!this.isExempt(item.name)) {
                        tax += this.roundUpTax(item.price * baseTax);
                    }

                    if (this.isImported(item.name)) {
                        tax += this.roundUpTax(item.price * importDuty);
                    }
                    let totalItemPrice = (item.price + tax) * item.quantity;
                    totalTax += tax * item.quantity;
                    totalAmount += totalItemPrice;

                    receiptAtItems.push(`${item.quantity} ${item.name}: ${totalItemPrice.toFixed(2)}`);

                })
                receipt.push(receiptAtItems.join(", "));
                
            });

            
            receipt.push(`${receiptConstants.salesTax}: ${totalTax.toFixed(2)}`);
            receipt.push(`${receiptConstants.total}: ${totalAmount.toFixed(2)}`);
            return receipt

            
        } catch (error) {
            throw new Error("Error creating receipt: " + error.message);
        }
    }

    convertToGoodsBrakeUps(line) {
        const regex = /(\d+)\s(.*?)\s+at\s+(\d+\.\d{2})/g;
        let items = [];
        let match;

        while ((match = regex.exec(line)) !== null) {
            items.push({
                quantity: parseInt(match[1], 10),
                name: match[2].trim(),
                price: parseFloat(match[3])
            });
        }

        return items;
    }

    roundUpTax(amount) {
        return Math.ceil(amount * 20) / 20;
    }

     isExempt(itemName) {
        return exemptGoods.some(keyword => itemName.includes(keyword));
      }
      
       isImported(itemName) {
        return itemName.includes(receiptConstants.imported);
      }

}

const receiptService = new ReceiptService();
module.exports = { receiptService }