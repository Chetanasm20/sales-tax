const { errorMessages } = require("../../error-messages/messages");


class ReceiptValidator{
    async validateReceiptPayload(payaload){
        const messages=[]

        if(!payaload||!payaload.length || !Array.isArray(payaload)){
            messages.push(errorMessages.inavalidPayload);
        }

        if(messages.length>0){
           return messages
        }else{
            return []
        }


    }
}
const receiptValidtaor=new ReceiptValidator()
module.exports={receiptValidtaor}