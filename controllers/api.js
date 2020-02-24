
const User = require('../models/sequelize').User
const Tx = require('../models/sequelize').Tx
const Event = require('../models/sequelize').Event
const Stats = require('../models/sequelize').Stats
const sequelize = require('../models/sequelize').sequelize
const rp = require('request-promise')
const Web3 = require('web3')

const CONTRACT_ABI = [{ "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "_user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "_level", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "_time", "type": "uint256" }], "name": "buyLevelEvent", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "_chUpline", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "_idCh", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "_idDw", "type": "uint256" }], "name": "chUplineLogEvent", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "_user", "type": "address" }, { "indexed": true, "internalType": "address", "name": "_referral", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "_level", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "_time", "type": "uint256" }], "name": "getMoneyForLevelEvent", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "_user", "type": "address" }, { "indexed": true, "internalType": "address", "name": "_referral", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "_level", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "_time", "type": "uint256" }], "name": "lostMoneyForLevelEvent", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "_user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "_level", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "_time", "type": "uint256" }], "name": "prolongateLevelEvent", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "_user", "type": "address" }, { "indexed": true, "internalType": "address", "name": "_referrer", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "_time", "type": "uint256" }], "name": "regLevelEvent", "type": "event" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "constant": true, "inputs": [], "name": "currUserID", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "END_OF_PERIOD_1", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "END_OF_PERIOD_2", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "END_OF_PERIOD_3", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "END_OF_PERIOD_4", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "END_OF_PERIOD_5", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "END_OF_PERIOD_6", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "END_OF_PERIOD_7", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "_user", "type": "address" }], "name": "findFreeReferrer", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "_user", "type": "address" }, { "internalType": "uint256", "name": "_level", "type": "uint256" }], "name": "getUserReferrer", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "ID_OF_PERIOD_1", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "ID_OF_PERIOD_2", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "ID_OF_PERIOD_3", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "ID_OF_PERIOD_4", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "ID_OF_PERIOD_5", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "ID_OF_PERIOD_6", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "LEVEL_PRICE", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "START_TIME", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "userList", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "users", "outputs": [{ "internalType": "bool", "name": "isExist", "type": "bool" }, { "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "uint256", "name": "referrerID", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "_user", "type": "address" }, { "internalType": "uint256", "name": "_level", "type": "uint256" }], "name": "viewCHLevelExpired", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "_user", "type": "address" }], "name": "viewCHUser", "outputs": [{ "internalType": "bool", "name": "isExist", "type": "bool" }, { "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "uint256", "name": "referrerID", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "_user", "type": "address" }, { "internalType": "uint256", "name": "_level", "type": "uint256" }], "name": "viewUserLevelExpired", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "_user", "type": "address" }], "name": "viewUserReferral", "outputs": [{ "internalType": "address[]", "name": "", "type": "address[]" }], "payable": false, "stateMutability": "view", "type": "function" }]

sendJSONresponse = function (res, status, content) {
    res.status(status)
    res.json(content)
}

module.exports.getData = (req, res) => {

}

module.exports.updateData = (req, res) => {

    sequelize.transaction(async (t) => {
        // Get Txs
        let options = {
            uri: process.env.ETHSCAN_API_URL,
            qs: {
                module: 'account',
                action: 'txlist',
                address: process.env.CONTRACT_ADDRESS,
                apiKey: process.env.ETHSCAN_API_KEY
            },
            json: true
        }
        let txs = await rp(options)

        // Check API response
        if (txs.message == 'OK') {
            // Save Txs into DB
            for (tx of txs.result) {

                // Check if it's a valid tx
                if (tx.isError != "0") continue

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
        const web3 = new Web3(new Web3.providers.HttpProvider(process.env.WEB3_HTTP_PROVIDER))
        // Instantiate contract
        const contract = new web3.eth.Contract(CONTRACT_ABI, process.env.CONTRACT_ADDRESS)

        // Total users
        const totalUsers = await contract.methods.currUserID().call()
        for (let i = 1; i <= totalUsers; i++) {
            let userAddress = await contract.methods.userList(i).call()
            // Get Referral
            let referralAddress = (await contract.methods.viewUserReferral(userAddress).call())[0]

            // Get ReferrerId
            let referrerId = (await contract.methods.users(userAddress).call()).referrerID

            await User.findOrCreate({
                where: {
                    address: userAddress,
                },
                defaults: {
                    referralAddress,
                    referrerId
                },
                transaction: t
            })
        }

        // Get other contract data


        // Get past events
        // https://www.pauric.blog/How-to-Query-and-Monitor-Ethereum-Contract-Events-with-Web3/
        const events = await contract.getPastEvents('allEvents', { fromBlock: 7389175, toBlock: 'latest' })

        for (event of events) {
            let userAddress, referrer, time, level, referral, txHash
            txHash = event.transactionHash
            if (event.event == 'regLevelEvent') {
                userAddress = event.returnValues._user
                referrer = event.returnValues._referrer
                time = event.returnValues._time
            }
            else if (event.event == 'buyLevelEvent') {
                userAddress = event.returnValues._user
                level = event.returnValues._level
                time = event.returnValues._time
                // Update user's level in DB
                let user = await User.findOne({
                    where: {
                        address: userAddress,
                    },
                    transaction: t
                })
                user.level = level
                await user.save({ transaction: t })
            }
            else if (event.event == 'getMoneyForLevelEvent') {
                userAddress = event.returnValues._user
                referral = event.returnValues._referral
                level = event.returnValues._level
                time = event.returnValues._time
            }
            else if (event.event == 'prolongateLevelEvent') {
                userAddress = event.returnValues._user
                level = event.returnValues._level
                time = event.returnValues._time
            }
            else if (event.event == 'lostMoneyForLevelEvent') {
                userAddress = event.returnValues._user
                referral = event.returnValues._referral
                level = event.returnValues._level
                time = event.returnValues._time
            } else {
                continue
            }
            // Insert Event into DB
            await Event.findOrCreate({
                where: {
                    name: event.event,
                    txHash: txHash
                },
                defaults: {
                    name: event.event,
                    userAddress,
                    referrer,
                    time,
                    level,
                    referral,
                    txHash
                },
                transaction: t
            })
        }

        // Get prices
        let prices = await rp({
            uri: process.env.COINMARKETCAP_API_URL,
            qs: {
                symbol: 'BTC,ETH'
            },
            headers: {
                'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY
            },
            json: true
        })
                
        // Update general data
        await Stats.findOrCreate({
            where: {
                id: 1
            },
            defaults: {
                totalUsers,
                btc_usd: prices.data.BTC.quote.USD.price,
                eth_usd: prices.data.ETH.quote.USD.price
            },
            transaction: t
        })


        sendJSONresponse(res, 200, { status: 'OK', message: 'Data updated successfully...' })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { message: 'Ocurrió un error al intentar actualizar los datos' })
            return
        })
}