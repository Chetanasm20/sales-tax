const { receiptService } = require("../receipt-service");

describe('Test cases for receipt service file', () => {

    //Test cases for create receipt method 
    it('test receipt creation calculation when input is given', async () => {
        const payload = ['1 book at 12.49', '1 music CD at 14.99'];
        const result = await receiptService.createReceipt(payload);
        expect(result).toEqual([
            '1 book: 12.49',
            '1 music CD: 16.49',
            "Sales Taxes: 1.50",
            "Total: 28.98",
        ]);
    })

    it('test receipt creation calculation when input has imported goods', async () => {
        const payload = ['1 imported bottle of perfume at 27.99 1 bottle of perfume at 18.99'];
        const result = await receiptService.createReceipt(payload);
        console.log(result);
        expect(result).toEqual([
            "1 imported bottle of perfume: 32.19,1 bottle of perfume: 20.89",
            "Sales Taxes: 6.10",
            "Total: 53.08",
        ]);
    })
    it('test receipt creation calculation when input has exempted goods', async () => {
        const payload = ['1 imported bottle of perfume at 27.99 1 book at 12.49'];
        const result = await receiptService.createReceipt(payload);
        console.log(result);
        expect(result).toEqual([
            "1 imported bottle of perfume: 32.19,1 book: 12.49",
            "Sales Taxes: 4.20",
            "Total: 44.68",
        ]);
    })

    //Test case for isExempt method
    it('test isExempt method when input is given', () => {
        const result = receiptService.isExempt("book");
        expect(result).toBe(true);
    })
    it('test isExempt method when input is not exempt', () => {
        const result = receiptService.isExempt("music CD");
        expect(result).toBe(false);
    })

    //Test case for isImported method
    it('test isImported method when input is given', () => {
        const result = receiptService.isImported("imported bottle of perfume");
        expect(result).toBe(true);
    })      
    it('test isImported method when input is not imported', () => {
        const result = receiptService.isImported("bottle of perfume");
        expect(result).toBe(false);
    })
})