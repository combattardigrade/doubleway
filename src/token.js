import Web3 from 'web3'
import fetch from 'node-fetch'

const ABI = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_user","type":"address"},{"indexed":false,"internalType":"uint256","name":"_level","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_time","type":"uint256"}],"name":"buyLevelEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_chUpline","type":"address"},{"indexed":false,"internalType":"uint256","name":"_idCh","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_idDw","type":"uint256"}],"name":"chUplineLogEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_user","type":"address"},{"indexed":true,"internalType":"address","name":"_referral","type":"address"},{"indexed":false,"internalType":"uint256","name":"_level","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_time","type":"uint256"}],"name":"getMoneyForLevelEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_user","type":"address"},{"indexed":true,"internalType":"address","name":"_referral","type":"address"},{"indexed":false,"internalType":"uint256","name":"_level","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_time","type":"uint256"}],"name":"lostMoneyForLevelEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_user","type":"address"},{"indexed":false,"internalType":"uint256","name":"_level","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"_time","type":"uint256"}],"name":"prolongateLevelEvent","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_user","type":"address"},{"indexed":true,"internalType":"address","name":"_referrer","type":"address"},{"indexed":false,"internalType":"uint256","name":"_time","type":"uint256"}],"name":"regLevelEvent","type":"event"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"constant":true,"inputs":[],"name":"END_OF_PERIOD_1","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"END_OF_PERIOD_2","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"END_OF_PERIOD_3","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"END_OF_PERIOD_4","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"END_OF_PERIOD_5","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"END_OF_PERIOD_6","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"END_OF_PERIOD_7","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ID_OF_PERIOD_1","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ID_OF_PERIOD_2","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ID_OF_PERIOD_3","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ID_OF_PERIOD_4","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ID_OF_PERIOD_5","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ID_OF_PERIOD_6","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"LEVEL_PRICE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"START_TIME","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"currUserID","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"findFreeReferrer","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"uint256","name":"_level","type":"uint256"}],"name":"getUserReferrer","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"userList","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"bool","name":"isExist","type":"bool"},{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"referrerID","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"uint256","name":"_level","type":"uint256"}],"name":"viewCHLevelExpired","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"viewCHUser","outputs":[{"internalType":"bool","name":"isExist","type":"bool"},{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"uint256","name":"referrerID","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"uint256","name":"_level","type":"uint256"}],"name":"viewUserLevelExpired","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"viewUserReferral","outputs":[{"internalType":"address[]","name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"}]
const CONTRACT = process.env.CONTRACT_ADDRESS
const HTTPPROVIDER = process.env.WEB3_HTTP_PROVIDER

const App = {
    web3: null,
    account: null,
    meta: null,

    login: async function () {
        if (window.ethereum) {
            this.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
            const accounts = await this.web3.eth.getAccounts()
            App.account = accounts[0]
            // Start contract
            await App.startContract()

            // Check if user exists in contract
            const userExists = await this.checkUserExists()
            if (userExists) {
                try {
                    await fetch(process.env.API_HOST + '/setUserAddress/' + App.account)
                    window.location.replace('/dashboard')
                    return
                }
                catch(e) {
                    console.log(e)
                    return
                }
            }
        } else {
            $('#metamaskModal').modal('show')
        }
    },

    manualLogin: async function () {
        // Connect to HTTP Provider
        this.web3 = new Web3(new Web3.providers.HttpProvider(HTTPPROVIDER))
        // Get account input
        App.account = document.getElementById('manualLoginAccount').value
        // Start contract
        await App.startContract()
        // Check if user exists in contract
        const userExists = await this.checkUserExists()
        if (userExists) {
            await fetch(process.env.API_HOST + '/setUserAddress/' + App.account)
            window.location.replace('/dashboard')
            return
        }
    },

    startContract: async function () {
        const { web3 } = this
        try {
            const networkId = await web3.eth.net.getId()
            // check if same network?
            this.meta = new web3.eth.Contract(ABI, CONTRACT)
            console.log("Connection to the contract stablished")
        }
        catch (err) {
            console.log(err)
            console.error("Could not connect to contract or chain.");
        }
    },

    checkUserExists: async function () {
        const { users } = this.meta.methods
        let response = await users(this.account).call()
        if (!response.isExist) {
            // document.getElementById('networkResponse').innerHTML = 'La cuenta no existe por favor registra una cuenta nueva para ingresar. Serás redireccionado a la página de registro en 5 segundos'
            window.location.replace('/signup')
            return
        }
        // save user in localStorage
        const user = {
            account: this.account,
            isExist: response.isExist,
            id: response.id,
            referrerID: response.referrerID
        }
        localStorage.setItem('user', JSON.stringify(user))
        console.log(localStorage.getItem('user'))
        return true
    },

    signup: async function (rid) {
        if (window.ethereum) {
            this.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
            const accounts = await this.web3.eth.getAccounts()
            App.account = accounts[0]
            // Start contract
            await App.startContract()

            let uplineUser = {}
            if (rid) {
                uplineUser.address = await App.meta.methods.userList(rid).call()
            } else {
                // Get upline address
                uplineUser = JSON.parse(localStorage.getItem('uplineUser'))
            }
            console.log(uplineUser)
            // Send transaction
            const tx = {
                from: App.account,
                to: CONTRACT,
                value: this.web3.utils.toWei("0.08", "ether"), // level1 price
                data: uplineUser.address, // upline      
                gas: 200000
            }
            this.web3.eth.sendTransaction(tx, function (err, res) {
                if (err) {
                    $('#tx-alert-error').show()
                    console.log(err)
                    return
                }
                console.log(res)
                $('#signup-tx').attr('href', `${process.env.ETHERSCAN_EXPLORER_URL}/tx/${res}`)
                // show message
                $('#tx-alert-success').show()

                // poll server to check if user exists
                async function checkUser() {
                    let res = await (await fetch(process.env.API_HOST + '/checkUserExists/' + App.account)).json()
                    if (res.status == 'OK') {
                        // set coockie and redirect
                        await fetch(process.env.API_HOST + '/setUserAddress/' + App.account)
                        window.location.replace('/dashboard')
                        return
                    }
                    setTimeout(checkUser, 5000);
                }

                // initial call, or just call refresh directly
                setTimeout(checkUser, 5000);
            })
        } else {
            $('#metamaskModal').modal('show')
        }
    },

    checkUpline: async function (upline) {
        // Connect to HTTP Provider
        const web3 = new Web3(new Web3.providers.HttpProvider(HTTPPROVIDER))
        // Instantiate contract
        const contract = new web3.eth.Contract(ABI, CONTRACT)

        // check if upline is ID or address
        if (!web3.utils.isAddress(upline)) {
            // Return false if ID isNaN
            if (isNaN(upline)) {
                return { value: false, msg: 'No se encontró el miembro con la identificación especificada o la dirección ethereum' }
            }
            // Get upline address with ID
            const uplineAddress = await contract.methods.userList(upline).call()
            // Check if ID exists = if returned address is valid
            if (uplineAddress == '0x0000000000000000000000000000000000000000') {
                return { value: false, msg: 'No se encontró el miembro con la identificación especificada o la dirección ethereum' }
            }
            // Save uplineUser in localstorage
            localStorage.setItem('uplineUser', JSON.stringify({ address: uplineAddress, id: upline, isExist: true }))
            console.log(localStorage.getItem('uplineUser'))
            return { value: true, address: uplineAddress }
        }

        // Check if user exists with address
        const response = await contract.methods.users(upline).call()

        if (!response.isExist) {
            return { value: false, msg: 'No se encontró el miembro con la identificación especificada o la dirección ethereum' }
        }

        // save upline user in localstorage
        // save user in localStorage
        const uplineUser = {
            address: upline,
            isExist: response.isExist,
            id: response.id,
            referrerID: response.referrerID
        }

        localStorage.setItem('uplineUser', JSON.stringify(uplineUser))
        console.log(localStorage.getItem('uplineUser'))
        return { value: true, address: upline }
    },

    enterUpline: async function () {
        console.log('enter upline btn clicked...')
        // Get upline
        const upline = document.getElementById('upline').value
        // check if value is empty
        if (!upline) {
            document.getElementById('networkResponse').innerHTML = 'No se encontró el miembro con la identificación especificada o la dirección ethereum'
            return
        }

        // Check upline 
        const response = await App.checkUpline(upline)

        // If upline is not valid show error message
        if (!response.value) {
            document.getElementById('networkResponse').innerHTML = response.msg
            return
        }

        // Continue witih signup process
        document.getElementById('signupForm-2').style.display = 'block'
        document.getElementById('signupForm-1').style.display = 'none'

    },

    getUpline: async function () {
        // Connect to HTTP Provider
        const web3 = new Web3(new Web3.providers.HttpProvider(HTTPPROVIDER))
        // Instantiate contract
        const contract = new web3.eth.Contract(ABI, CONTRACT)
        // Get upline address with ID
        const freeReferrer = await contract.methods.findFreeReferrer('0x81eaAb6234571b004aE91BD0b640214540b69964').call()
        const uplineUser = {
            address: freeReferrer,
            isExist: true,            
        }
        localStorage.setItem('uplineUser', JSON.stringify(uplineUser))
        document.getElementById('uplineManualSignup').value = uplineUser.address
        document.getElementById('signupForm-2').style.display = 'block'
        document.getElementById('signupForm-1').style.display = 'none'
        return
    },

    connectHttpProvider: async function () {
        App.web3 = new Web3(new Web3.providers.HttpProvider(HTTPPROVIDER))
    },

    buyLevel: async function (level) {
        if (window.ethereum) {
            this.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
            const accounts = await this.web3.eth.getAccounts()
            App.account = accounts[0]
            // Start contract
            await App.startContract()

            // Get level price
            let levelPrice = await App.meta.methods.LEVEL_PRICE(level).call()
            console.log(levelPrice)

            // Prepare transaction
            const tx = {
                from: App.account,
                to: CONTRACT,
                value: levelPrice, // level1 price                   
                gas: 200000
            }
            this.web3.eth.sendTransaction(tx, function (err, res) {
                if (err) {
                    console.log(err)
                    return
                }
                console.log(res)
                console.log('Level purchased')
                // redirect or show message
            })
        }
    },




}

window.App = App

window.addEventListener("load", async function () {
    // App.getPlatformData()


});

// const autoLoginBtn = document.getElementById('auto-login-btn')
// autoLoginBtn.addEventListener('click', async function (e) {
//     e.preventDefault()
//     await App.login()
// })
