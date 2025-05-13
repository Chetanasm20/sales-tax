const express = require('express')
const receiptHandler = require('./handler/receipt-handler')
const receiptRoute = require('./routes/receipt-route')
// const { default: receiptRoute } = require('./routes/receipt-route')
// const {  receiptHandler } = require('./handler/receipt-handler')
const app = express()
require('dotenv').config()

const port = process.env.SERVER_PORT
const hostName=process.env.HOST_NAME


app.use(express.json())

app.use('/receipt',receiptRoute )


app.listen(port,hostName, () => {

    console.log(`Server started and is running on port - http://${hostName}:${port}`)
    
})