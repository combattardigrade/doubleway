
const User = require('../models/sequelize').User
const Tx = require('../models/sequelize').Tx
const Event = require('../models/sequelize').Event
const Stats = require('../models/sequelize').Stats
const sequelize = require('../models/sequelize').sequelize
const rp = require('request-promise')
const Web3 = require('web3')
const BigNumber = require('bignumber.js')
const moment = require('moment')
const QRCode = require('qrcode')
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

module.exports.checkRefId = async (req, res) => {
    const rid = req.params.rid
    if (!rid) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Missing required arguments' })
        return
    }

    User.findOne({
        where: {
            id: rid
        }
    })
        .then((user) => {
            if (user) {
                sendJSONresponse(res, 200, { status: 'OK', message: 'Valid Referral ID.' })
                return
            } else {
                sendJSONresponse(res, 404, { status: 'ERROR', message: 'Invalid Referral ID.' })
                return
            }
        })
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

        const myTxs = await Event.findAll({
            where: {
                userAddress,
                $or: [
                    {
                        name: { $eq: 'buyLevelEvent' }
                    },
                    {
                        name: { $eq: 'regLevelEvent' }
                    }
                ]
            },
            raw: true,
            transaction: t
        })

        for (tx of myTxs) {
            console.log(tx.txHash)
            tx.tx = await Tx.findOne({ where: { hash: tx.txHash }, transaction: t })
        }

        const referrals = await User.findAll({
            where: {
                $or: [
                    { referrerLevel1: { $eq: userAddress } },
                    { referrerLevel2: { $eq: userAddress } },
                    { referrerLevel3: { $eq: userAddress } },
                    { referrerLevel4: { $eq: userAddress } },
                    { referrerLevel5: { $eq: userAddress } },
                    { referrerLevel6: { $eq: userAddress } },
                    { referrerLevel7: { $eq: userAddress } },
                    { referrerLevel8: { $eq: userAddress } },
                ]
            },
            transaction: t
        })

        const referralsByLevel = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [] }
        const referralsByLine = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [] }
        for (ref of referrals) {
            referralsByLevel[ref.level].push(ref)

            if (ref.referrerLevel1 == userAddress) referralsByLine[1].push(ref)
            else if (ref.referrerLevel2 == userAddress) referralsByLine[2].push(ref)
            else if (ref.referrerLevel3 == userAddress) referralsByLine[3].push(ref)
            else if (ref.referrerLevel4 == userAddress) referralsByLine[4].push(ref)
            else if (ref.referrerLevel5 == userAddress) referralsByLine[5].push(ref)
            else if (ref.referrerLevel6 == userAddress) referralsByLine[6].push(ref)
            else if (ref.referrerLevel7 == userAddress) referralsByLine[7].push(ref)
            else if (ref.referrerLevel8 == userAddress) referralsByLine[8].push(ref)
        }



        const levelUps = await Event.findAll({
            where: {
                name: 'getMoneyForLevelEvent',
                userAddress,
            },
            raw: true,
            transaction: t
        })



        const stats = await Stats.findOne({ where: { id: 1 }, transaction: t })

        // Calculate total earnings
        let totalEarnings = new BigNumber(0)
        for (l of levelUps) {
            let amount = 0
            if (l.level == 1) amount = stats.level1Price
            else if (l.level == 2) amount = stats.level2Price
            else if (l.level == 3) amount = stats.level3Price
            else if (l.level == 4) amount = stats.level4Price
            else if (l.level == 5) amount = stats.level5Price
            else if (l.level == 6) amount = stats.level6Price
            else if (l.level == 7) amount = stats.level7Price
            else if (l.level == 8) amount = stats.level8Price
            totalEarnings = totalEarnings.plus(amount)
            l.tx = await Tx.findOne({ where: { hash: l.txHash }, transaction: t })
        }

        // Get level exp
        const levelExp = {
            1: user.level1Exp,
            2: user.level2Exp,
            3: user.level3Exp,
            4: user.level4Exp,
            5: user.level5Exp,
            6: user.level6Exp,
            7: user.level7Exp,
            8: user.level8Exp,
        }

        // Get Referrers        
        const referrers = {
            1: await User.findOne({ where: { address: user.referrerLevel1 }, transaction: t }),
            2: await User.findOne({ where: { address: user.referrerLevel2 }, transaction: t }),
            3: await User.findOne({ where: { address: user.referrerLevel3 }, transaction: t }),
            4: await User.findOne({ where: { address: user.referrerLevel4 }, transaction: t }),
            5: await User.findOne({ where: { address: user.referrerLevel5 }, transaction: t }),
            6: await User.findOne({ where: { address: user.referrerLevel6 }, transaction: t }),
            7: await User.findOne({ where: { address: user.referrerLevel7 }, transaction: t }),
            8: await User.findOne({ where: { address: user.referrerLevel8 }, transaction: t })
        }

        const data = {
            user,
            referrals,
            totalReferrals: referrals.length,
            totalEarnings,
            levelExp,
            levelUps,
            myTxs,
            referralsByLevel,
            referralsByLine,
            referrers
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
            volume = volume.plus(tx.value)
        }

        // Get Total Txs in the last 24 hrs
        const last24hTxs = await Tx.findAll({ where: { createdAt: { $gt: moment().subtract(1, 'days').toDate() } }, attributes: ['id', 'value'], transaction: t })
        let last24hVolume = new BigNumber(0)
        for (tx of last24hTxs) {
            last24hVolume = last24hVolume.plus(tx.value)
        }

        // Convertions        
        let usd_volume = volume.multipliedBy(new BigNumber(stats.eth_usd))
        let btc_volume = usd_volume.div(new BigNumber(stats.btc_usd))

        const now = moment(new Date())
        const launch = moment.unix(stats.launchTime)

        // levelPrices
        const levels = {
            1: { price: 0.08, income: 0.16, referrals: 2 },
            2: { price: 0.16, income: 0.64, referrals: 4 },
            3: { price: 0.32, income: 2.56, referrals: 8 },
            4: { price: 0.64, income: 10.24, referrals: 16 },
            5: { price: 1.28, income: 40.96, referrals: 32 },
            6: { price: 2.56, income: 163.84, referrals: 64 },
            7: { price: 5.12, income: 655.36, referrals: 128 },
            8: { price: 10.24, income: 2621.55, referrals: 256 },
        }

        // Earnings
        const moneyTxs = await Event.findAll({ where: { name: 'getMoneyForLevelEvent' }, limit: 10, order: [['time', 'DESC']], transaction: t })

        const data = {
            totalUsers,
            totalUsersByLevel,
            txs: {
                total: txs.length,
                eth_volume: volume.toFixed(4),
                usd_volume: usd_volume.toFixed(2),
                btc_volume: btc_volume.toFixed(4),
                last24hVolume: last24hVolume,
                last24hTotal: last24hTxs.length
            },
            projectTime: moment.duration(now.diff(launch)).asYears().toFixed(4),
            levels,
            facebook: stats.facebook,
            twitter: stats.twitter,
            telegram: stats.telegram,
            youtube: stats.youtube,
            contractAddress: process.env.CONTRACT_ADDRESS,
            prices: {
                btc_usd: parseFloat(stats.btc_usd).toFixed(2),
                eth_usd: parseFloat(stats.eth_usd).toFixed(2)
            },
            moneyTxs,
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
                        txHash: tx.hash,
                        transactionIndex: tx.transactionIndex,
                        from: tx.from,
                        to: tx.to,
                        value: weiToEther(tx.value).toFixed(8),
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

            // Get Level Expirations
            let level1Exp = await contract.methods.viewUserLevelExpired(userAddress, 1).call()
            let level2Exp = await contract.methods.viewUserLevelExpired(userAddress, 2).call()
            let level3Exp = await contract.methods.viewUserLevelExpired(userAddress, 3).call()
            let level4Exp = await contract.methods.viewUserLevelExpired(userAddress, 4).call()
            let level5Exp = await contract.methods.viewUserLevelExpired(userAddress, 5).call()
            let level6Exp = await contract.methods.viewUserLevelExpired(userAddress, 6).call()
            let level7Exp = await contract.methods.viewUserLevelExpired(userAddress, 7).call()
            let level8Exp = await contract.methods.viewUserLevelExpired(userAddress, 8).call()

            // Get Referrers
            let referrerLevel1 = await contract.methods.getUserReferrer(userAddress, 1).call()
            let referrerLevel2 = await contract.methods.getUserReferrer(userAddress, 2).call()
            let referrerLevel3 = await contract.methods.getUserReferrer(userAddress, 3).call()
            let referrerLevel4 = await contract.methods.getUserReferrer(userAddress, 4).call()
            let referrerLevel5 = await contract.methods.getUserReferrer(userAddress, 5).call()
            let referrerLevel6 = await contract.methods.getUserReferrer(userAddress, 6).call()
            let referrerLevel7 = await contract.methods.getUserReferrer(userAddress, 7).call()
            let referrerLevel8 = await contract.methods.getUserReferrer(userAddress, 8).call()

            referrerLevel1 = referrerLevel1 != '0x0000000000000000000000000000000000000000' ? referrerLevel1 : null
            referrerLevel2 = referrerLevel2 != '0x0000000000000000000000000000000000000000' ? referrerLevel2 : null
            referrerLevel3 = referrerLevel3 != '0x0000000000000000000000000000000000000000' ? referrerLevel3 : null
            referrerLevel4 = referrerLevel4 != '0x0000000000000000000000000000000000000000' ? referrerLevel4 : null
            referrerLevel5 = referrerLevel5 != '0x0000000000000000000000000000000000000000' ? referrerLevel5 : null
            referrerLevel6 = referrerLevel6 != '0x0000000000000000000000000000000000000000' ? referrerLevel6 : null
            referrerLevel7 = referrerLevel7 != '0x0000000000000000000000000000000000000000' ? referrerLevel7 : null
            referrerLevel8 = referrerLevel8 != '0x0000000000000000000000000000000000000000' ? referrerLevel8 : null

            const [user, created] = await User.findOrCreate({
                where: {
                    address: userAddress,
                },
                defaults: {
                    id: i,
                    referrerLevel1,
                    referrerLevel2,
                    referrerLevel3,
                    referrerLevel4,
                    referrerLevel5,
                    referrerLevel6,
                    referrerLevel7,
                    referrerLevel8,
                    level1Exp,
                    level2Exp,
                    level3Exp,
                    level4Exp,
                    level5Exp,
                    level6Exp,
                    level7Exp,
                    level8Exp,
                },
                transaction: t
            })

            if (!created) {
                user.referrerLevel1 = referrerLevel1
                user.referrerLevel2 = referrerLevel2
                user.referrerLevel3 = referrerLevel3
                user.referrerLevel4 = referrerLevel4
                user.referrerLevel5 = referrerLevel5
                user.referrerLevel6 = referrerLevel6
                user.referrerLevel7 = referrerLevel7
                user.referrerLevel8 = referrerLevel8
                user.level1Exp = level1Exp
                user.level2Exp = level2Exp
                user.level3Exp = level3Exp
                user.level4Exp = level4Exp
                user.level5Exp = level5Exp
                user.level6Exp = level6Exp
                user.level7Exp = level7Exp
                user.level8Exp = level8Exp
                await user.save({ transaction: t })
            }
        }
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



        // Get Level Prices
        const level1Price = weiToEther(await contract.methods.LEVEL_PRICE(1).call()).toFixed(8)
        const level2Price = weiToEther(await contract.methods.LEVEL_PRICE(2).call()).toFixed(8)
        const level3Price = weiToEther(await contract.methods.LEVEL_PRICE(3).call()).toFixed(8)
        const level4Price = weiToEther(await contract.methods.LEVEL_PRICE(4).call()).toFixed(8)
        const level5Price = weiToEther(await contract.methods.LEVEL_PRICE(5).call()).toFixed(8)
        const level6Price = weiToEther(await contract.methods.LEVEL_PRICE(6).call()).toFixed(8)
        const level7Price = weiToEther(await contract.methods.LEVEL_PRICE(7).call()).toFixed(8)
        const level8Price = weiToEther(await contract.methods.LEVEL_PRICE(8).call()).toFixed(8)

        // Update general data
        const [stats, created] = await Stats.findOrCreate({
            where: {
                id: 1
            },
            defaults: {
                totalUsers,
                level1Price,
                level2Price,
                level3Price,
                level4Price,
                level5Price,
                level6Price,
                level7Price,
                level8Price,
            },
            transaction: t
        })

        if (!created) {
            stats.totalUsers = totalUsers
            stats.level1Price = level1Price
            stats.level2Price = level2Price
            stats.level3Price = level3Price
            stats.level4Price = level4Price
            stats.level5Price = level5Price
            stats.level6Price = level6Price
            stats.level7Price = level7Price
            stats.level8Price = level8Price
            await stats.save({ transaction: t })
        }

        sendJSONresponse(res, 200, { status: 'OK', message: 'Data updated successfully...' })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Ocurrió un error al intentar actualizar los datos' })
            return
        })
}

module.exports.updatePrices = (req, res) => {

    sequelize.transaction(async (t) => {
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
        // Update prices data
        const stats = await Stats.findOne({
            where: {
                id: 1
            },
            transaction: t
        })
        stats.btc_usd = prices.data.BTC.quote.USD.price
        stats.eth_usd = prices.data.ETH.quote.USD.price
        await stats.save({ transaction: t })
        sendJSONresponse(res, 200, { status: 'OK', message: 'Data updated successfully...' })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'Ocurrió un error al intentar actualizar los datos' })
            return
        })
}

module.exports.getReferrals = (req, res) => {
    const userId = req.params.userId
    if (!userId) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Missing required arguments' })
        return
    }
    sequelize.transaction(async (t) => {
        // Check if user exists and get address
        const user = await User.findOne({ where: { id: userId }, attributes: ['id', 'address'], transaction: t })
        if (!user) {
            sendJSONresponse(res, 404, { status: 'ERROR', message: 'User not found' })
            return
        }

        const referrals = await User.findAll({
            where: {
                $or: [
                    {
                        referrerLevel1: { $eq: user.address }
                    },
                    {
                        referrerLevel1: { $eq: user.address }
                    }
                ]
            }
        })

        sendJSONresponse(res, 200, { status: 'OK', payload: referrals })
        return
    })
        .catch((err) => {
            console.log(err)
            sendJSONresponse(res, 422, { status: 'ERROR', message: 'Ocurrió un error al intentar realizar la acción' })
            return
        })
}

module.exports.checkUserExists = (req, res) => {
    const userAddress = req.params.userAddress
    if (!userAddress) {
        sendJSONresponse(res, 422, { status: 'ERROR', message: 'Missing required arguments' })
        return
    }
    User.findOne({ where: { address: userAddress } })
        .then((user) => {
            if (!user) {
                sendJSONresponse(res, 404, { status: 'ERROR', message: 'User not found' })
                return
            }
            sendJSONresponse(res, 200, { status: 'OK', message: 'User exists' })
            return
        })
}