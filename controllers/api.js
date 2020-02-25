
const User = require('../models/sequelize').User
const Tx = require('../models/sequelize').Tx
const Event = require('../models/sequelize').Event
const Stats = require('../models/sequelize').Stats
const sequelize = require('../models/sequelize').sequelize
const rp = require('request-promise')
const Web3 = require('web3')
const BigNumber = require('bignumber.js')
const moment = require('moment')
const CONTRACT_ABI = [{ "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "_user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "_level", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "_time", "type": "uint256" }], "name": "buyLevelEvent", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "_chUpline", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "_idCh", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "_idDw", "type": "uint256" }], "name": "chUplineLogEvent", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "_user", "type": "address" }, { "indexed": true, "internalType": "address", "name": "_referral", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "_level", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "_time", "type": "uint256" }], "name": "getMoneyForLevelEvent", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "_user", "type": "address" }, { "indexed": true, "internalType": "address", "name": "_referral", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "_level", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "_time", "type": "uint256" }], "name": "lostMoneyForLevelEvent", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "_user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "_level", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "_time", "type": "uint256" }], "name": "prolongateLevelEvent", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "_user", "type": "address" }, { "indexed": true, "internalType": "address", "name": "_referrer", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "_time", "type": "uint256" }], "name": "regLevelEvent", "type": "event" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "constant": true, "inputs": [], "name": "currUserID", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "END_OF_PERIOD_1", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "END_OF_PERIOD_2", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "END_OF_PERIOD_3", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "END_OF_PERIOD_4", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "END_OF_PERIOD_5", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "END_OF_PERIOD_6", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "END_OF_PERIOD_7", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "_user", "type": "address" }], "name": "findFreeReferrer", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "_user", "type": "address" }, { "internalType": "uint256", "name": "_level", "type": "uint256" }], "name": "getUserReferrer", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "ID_OF_PERIOD_1", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "ID_OF_PERIOD_2", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "ID_OF_PERIOD_3", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "ID_OF_PERIOD_4", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "ID_OF_PERIOD_5", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "ID_OF_PERIOD_6", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "LEVEL_PRICE", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "START_TIME", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "userList", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "users", "outputs": [{ "internalType": "bool", "name": "isExist", "type": "bool" }, { "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "uint256", "name": "referrerID", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "_user", "type": "address" }, { "internalType": "uint256", "name": "_level", "type": "uint256" }], "name": "viewCHLevelExpired", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "_user", "type": "address" }], "name": "viewCHUser", "outputs": [{ "internalType": "bool", "name": "isExist", "type": "bool" }, { "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "uint256", "name": "referrerID", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "_user", "type": "address" }, { "internalType": "uint256", "name": "_level", "type": "uint256" }], "name": "viewUserLevelExpired", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "_user", "type": "address" }], "name": "viewUserReferral", "outputs": [{ "internalType": "address[]", "name": "", "type": "address[]" }], "payable": false, "stateMutability": "view", "type": "function" }]

sendJSONresponse = function (res, status, content) {
    res.status(status)
    res.json(content)
}

function weiToEther(value) {
    value = new BigNumber(value)
    let weiEth = new BigNumber('1000000000000000000')
    return value.div(weiEth)
}

module.exports.setUserAddress = async (req, res) => {
    const userAddress = req.params.userAddress

    if (!userAddress) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Missing required arguments' })
        return
    }

    const user = await User.findOne({
        where: {
            address: userAddress
        },
    })

    if (!user) {
        sendJSONresponse(res, 404, { status: 'ERROR', message: 'User not found' })
        return
    }

    // set cookie
    res.cookie('userAddress', userAddress, { httpOnly: true, secure: process.env.NODE_ENV == 'production' })

    sendJSONresponse(res, 200, { status: 'OK', message: 'User address saved...' })
    return
}


module.exports.getUserData = (req, res) => {
    const userAddress = req.params.userAddress

    if (!userAddress) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Missing required arguments' })
        return
    }

    sequelize.transaction(async (t) => {
        const user = await User.findOne({ where: { address: userAddress }, transaction: t })

        if (!user) {
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'User not found' })
            return
        }

        const referrals = await Event.findAll({
            where: {
                name: 'regLevelEvent',
                referrer: user.address
            },
            transaction: t
        })

        const levelUps = await Event.findAll({
            where: {
                name: 'getMoneyForLevelEvent',
                userAddress,
            },
            transaction: t
        })


        // Get Contract Data
        const web3 = new Web3(new Web3.providers.HttpProvider(process.env.WEB3_HTTP_PROVIDER))
        // Instantiate contract
        const contract = new web3.eth.Contract(CONTRACT_ABI, process.env.CONTRACT_ADDRESS)

        // Calculate total earnings
        let totalEarnings = new BigNumber(0)
        for (l of levelUps) {
            const amount = weiToEther(await contract.methods.LEVEL_PRICE(l.level).call())                        
            totalEarnings = totalEarnings.plus(amount)            
        }

        // Get level exp
        
        const levelExp = {
            1: await contract.methods.viewUserLevelExpired(userAddress, 1).call(),
            2: await contract.methods.viewUserLevelExpired(userAddress, 2).call(),
            3: await contract.methods.viewUserLevelExpired(userAddress, 3).call(),
            4: await contract.methods.viewUserLevelExpired(userAddress, 4).call(),
            5: await contract.methods.viewUserLevelExpired(userAddress, 5).call(),
            6: await contract.methods.viewUserLevelExpired(userAddress, 6).call(),
            7: await contract.methods.viewUserLevelExpired(userAddress, 7).call(),
            8: await contract.methods.viewUserLevelExpired(userAddress, 8).call(),
        }

        const data = {
            user,
            referrals,
            totalReferrals: referrals.length,
            totalEarnings,
            levelExp
        }

        sendJSONresponse(res, 200, { status: 'OK', payload: data })
        return

    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Ocurrió un error al intentar realizar la acción' })
            return
        })
}

module.exports.getPlatformData = (req, res) => {
    sequelize.transaction(async (t) => {
        // Get total users by level
        const totalUsersByLevel = []
        let totalUsers = 0
        for (let i = 1; i <= 8; i++) {
            let results = await User.findAll({ where: { level: i }, transaction: t })
            totalUsersByLevel.push({ level: i, total: results.length })
            totalUsers += results.length
        }

        // Get Platform Stats
        const stats = await Stats.findOne({ where: { id: 1 }, transaction: t })

        // Get Total Txs and Volume
        const txs = await Tx.findAll({ attributes: ['id', 'value'], transaction: t })
        let volume = new BigNumber(0)
        for (tx of txs) {
            // let value = new BigNumber(tx.value)
            // let weiToEth = new BigNumber('1000000000000000000')
            // value = value.div(weiToEth)
            value = weiToEther(tx.value)
            volume = volume.plus(value)
        }

        // Convertions        
        let usd_volume = volume.multipliedBy(new BigNumber(stats.eth_usd))
        let btc_volume = usd_volume.div(new BigNumber(stats.btc_usd))

        const now = moment(new Date())
        const launch = moment.unix(stats.launchTime)

        const data = {
            totalUsers,
            totalUsersByLevel,
            txs: {
                total: txs.length,
                eth_volume: volume.toFixed(4),
                usd_volume: usd_volume.toFixed(2),
                btc_volume: btc_volume.toFixed(4)
            },
            projectTime: moment.duration(now.diff(launch)).asYears().toFixed(4)
        }

        sendJSONresponse(res, 200, { status: 'OK', payload: data })
        return


    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Ocurrió un error al intentar actualizar los datos' })
            return
        })
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
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Ocurrió un error al intentar actualizar los datos' })
            return
        })
}