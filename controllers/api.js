
const User = require('../models/sequelize').User
const Tx = require('../models/sequelize').Tx
const sequelize = require('../models/sequelize').sequelize
const rp = require('request-promise')


sendJSONresponse = function (res, status, content) {
    res.status(status)
    res.json(content)
}

module.exports.test = (req, res) => {

    sequelize.transaction(async (t) => {
        // Get Txs
        const options = {
            uri: process.env.ETHSCAN_API_URL,
            qs: {
                module: 'account',
                action: 'txlist',
                address: process.env.CONTRACT_ADDRESS,
                apiKey: process.env.ETHSCAN_API_KEY
            },
            json: true
        }
        txs = await rp(options)

        // Check API response
        if (txs.message == 'OK') {
            // Save Txs into DB
            for (tx of txs.result) {
                
                // Check if it's a valid tx
                if(tx.isError != "1") continue

                await Tx.findOrCreate({
                    where: {
                        hash: tx.hash
                    },
                    defaults: {
                        blockNumber: tx.blockNumber,
                        timeStamp: tx.timeStamp,
                        hash: tx.hash,
                        transactionIndex: tx.transactionIndex,
                        from: tx.from,
                        to: tx.to,
                        value: tx.value,
                        gas: tx.gas,
                        gasPrice: tx.gasPrice,
                        isError: tx.isError,
                        txreceipt_status: tx.txreceipt_status,
                        input: tx.input,
                        contractAddress: tx.contractAddress,
                        cumulativeGasUsed: tx.cumulativeGasUsed,
                        gasUsed: tx.gasUsed,
                        confirmations: tx.confirmations
                    },
                    transaction: t
                })
                    
            }
        }

        // Get Contract Data


        sendJSONresponse(res, 200, txs)
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { message: 'Ocurrió un error al intentar actualizar los datos' })
            return
        })
}