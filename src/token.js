import Web3 from 'web3'

const ABI = [{ "constant": true, "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "userList", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "users", "outputs": [{ "internalType": "bool", "name": "isExist", "type": "bool" }, { "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "uint256", "name": "referrerID", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "_user", "type": "address" }, { "internalType": "uint256", "name": "_level", "type": "uint256" }], "name": "viewUserLevelExpired", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }]
const CONTRACT = '0x45266CD8e2bd4F25a5DDa555C86244503768f22d'
const HTTPPROVIDER = 'https://ropsten.infura.io/v3/9bae6681948f47aca03246c6d6b7b8e4'

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
            await this.checkUserExists()
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
            window.location.replace('/signup')
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
    },

    signup: async function () {
        await App.connectHttpProvider()
        await App.startContract()
    },

    checkUpline: async function (upline) {
        // Connect to HTTP Provider
        const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/9bae6681948f47aca03246c6d6b7b8e4'))
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
            if(uplineAddress == '0x0000000000000000000000000000000000000000') {
                return { value: false, msg: 'No se encontró el miembro con la identificación especificada o la dirección ethereum'}
            }
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

    signupBtn: async function () {
        console.log('signup btn clicked...')
        // Get upline
        const upline = document.getElementById('upline').value
        // check if value is empty
        if (!upline) {
            document.getElementById('networkResponse').innerHTML = 'No se encontró el miembro con la identificación especificada o la dirección ethereum'
            return
        }

        // Check upline 
        const response = await App.checkUpline(upline)
        console.log(response)

        // If upline is not valid show error message
        if(!response.value) {
            document.getElementById('networkResponse').innerHTML = response.msg
            return
        }

        // Continue witih signup process

    },

    connectHttpProvider: async function () {
        App.web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/9bae6681948f47aca03246c6d6b7b8e4'))
    }


}

window.App = App

window.addEventListener("load", async function () {
    const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/9bae6681948f47aca03246c6d6b7b8e4'))
    const contract = new web3.eth.Contract(ABI, CONTRACT)
    // const response = await contract.methods.userList('1').call()

    
});

// const autoLoginBtn = document.getElementById('auto-login-btn')
// autoLoginBtn.addEventListener('click', async function (e) {
//     e.preventDefault()
//     await App.login()
// })
