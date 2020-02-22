import Web3 from 'web3'
const ABI = [ { "constant": true, "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "userList", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "users", "outputs": [ { "internalType": "bool", "name": "isExist", "type": "bool" }, { "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "uint256", "name": "referrerID", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "address", "name": "_user", "type": "address" }, { "internalType": "uint256", "name": "_level", "type": "uint256" } ], "name": "viewUserLevelExpired", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" } ]
const CONTRACT = '0x45266CD8e2bd4F25a5DDa555C86244503768f22d'

const App = {
    web3: null,
    account: null,
    meta: null,

    login: async function () {
        if(window.ethereum) {
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

    startContract: async function() {
        const { web3 } = this
        try {
            const networkId = await web3.eth.net.getId()
            // check if same network?
            this.meta = new web3.eth.Contract(ABI, CONTRACT)
            console.log("Connection to the contract stablished")
        }
        catch(err) {
            console.log(err)
            console.error("Could not connect to contract or chain.");
        }        
    },

    checkUserExists: async function() {
        const { users } = this.meta.methods
        let response = await users(this.account).call()
        if(!response.isExist) {
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
    }

    
}

window.App = App

window.addEventListener("load", async function () {
    // if (window.ethereum) {
    //     // use MetaMask's provider
    //     App.web3 = new Web3(window.ethereum);
    //     await window.ethereum.enable(); // get permission to access accounts
    // }

    // App.start();
});

const autoLoginBtn = document.getElementById('auto-login-btn')
autoLoginBtn.addEventListener('click', async function () {
    await App.login()
})