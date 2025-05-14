const { exemptGoods } = require("../master-data/goods-mster-data");

class ReceiptService {
    async createReceipt(inputs) {

        try {
            const baseTax = 0.10;
            const importDuty = 0.05;
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
                receipt.push(receiptAtItems.join(","));
                
            });

            
            receipt.push(`Sales Taxes: ${totalTax.toFixed(2)}`);
            receipt.push(`Total: ${totalAmount.toFixed(2)}`);
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
        return itemName.includes('imported');
      }

}

const receiptService = new ReceiptService();
module.exports = { receiptService }