const fetch = require('node-fetch')



module.exports.renderHome = async function (req, res) {
    if (req.query.rid) {
        const response = await (await fetch(process.env.API_HOST + `/checkRefId/${req.query.rid}`)).json()
        if (response.status == 'OK') res.cookie('rid', req.query.rid, { httpOnly: true, secure: process.env.NODE_ENV == 'production' })
    }
    const platformData = await (await fetch(process.env.API_HOST + '/platformData')).json()
    res.render('home', {
        host: process.env.SERVER_HOST,
        title: 'Inicio',
        homePage: true,
        url: 'home',
        platformData: platformData.payload,
        etherscanExplorer: process.env.ETHERSCAN_EXPLORER_URL
    })
}

module.exports.renderLogin = async function (req, res) {
    if (req.query.rid) {
        const response = await (await fetch(process.env.API_HOST + `/checkRefId/${req.query.rid}`)).json()
        if (response.status == 'OK') res.cookie('rid', req.query.rid, { httpOnly: true, secure: process.env.NODE_ENV == 'production' })
    }
    const platformData = await (await fetch(process.env.API_HOST + '/platformData')).json()
    res.render('login', {
        host: process.env.SERVER_HOST,
        title: 'Iniciar sesión',
        url: 'login',
        etherscanExplorer: process.env.ETHERSCAN_EXPLORER_URL,
        platformData: platformData.payload
    })
}

module.exports.renderSignup = async function (req, res) {
    let rid = req.query.rid
    if (rid) {
        const response = await (await fetch(process.env.API_HOST + `/checkRefId/${rid}`)).json()
        if (response.status == 'OK') {
            res.cookie('rid', rid, { httpOnly: true, secure: process.env.NODE_ENV == 'production' })
        } else {
            rid = null
        }
    }
    const platformData = await (await fetch(process.env.API_HOST + '/platformData')).json()
    res.render('signup', {
        host: process.env.SERVER_HOST,
        title: 'Registrar cuenta',
        url: 'signup',
        rid: rid ? rid : req.cookies.rid ? req.cookies.rid : null,
        etherscanExplorer: process.env.ETHERSCAN_EXPLORER_URL,
        platformData: platformData.payload
    })
}

module.exports.renderFaq = function (req, res) {
    res.render('faq', {
        host: process.env.SERVER_HOST,
        title: 'Preguntas Frecuentes',
        url: 'faq'
    })
}

module.exports.renderFaqEth = function (req, res) {
    res.render('faqeth', {
        host: process.env.SERVER_HOST,
        title: 'Preguntas Frecuentes Sobre Ethereum',
        url: 'faqeth'
    })
}

module.exports.renderTerminos = function (req, res) {
    res.render('terminos', {
        host: process.env.SERVER_HOST,
        title: 'Términos y condiciones',
        url: 'terminos'
    })
}

module.exports.renderComofunciona = function (req, res) {
    res.render('comofunciona', {
        host: process.env.SERVER_HOST,
        title: '¿Cómo funciona?',
        url: 'comofunciona'
    })
}

module.exports.renderDashboard = async function (req, res) {
    const userAddress = req.cookies.userAddress
    if (!userAddress) {
        res.writeHead(302, {
            'Location': '/login'
        })
        res.end()
    }

    const platformData = await (await fetch(process.env.API_HOST + '/platformData')).json()
    const userData = await (await fetch(process.env.API_HOST + '/userData/' + userAddress)).json()

    res.render('dashboard', {
        host: process.env.SERVER_HOST,
        title: 'Dashboard',
        url: 'dashboard',
        userData: userData.payload,
        platformData: platformData.payload
    })
}

module.exports.logout = async function (req, res) {
    res.clearCookie('rid')
    res.clearCookie('userAddress')
    res.writeHead(302, {
        'Location': '/login'
    })
    res.end()
}

module.exports.renderRefLinks = async function (req, res) {
    const userAddress = req.cookies.userAddress
    if (!userAddress) {
        res.writeHead(302, {
            'Location': '/login'
        })
        res.end()
    }
    const platformData = await (await fetch(process.env.API_HOST + '/platformData')).json()
    const userData = await (await fetch(process.env.API_HOST + '/userData/' + userAddress)).json()
    res.render('reflinks', {
        host: process.env.SERVER_HOST,
        title: 'Enlace de Referidos',
        url: 'reflinks',
        userData: userData.payload,
        platformData: platformData.payload
    })
}

module.exports.renderQrCodes = async function (req, res) {
    const userAddress = req.cookies.userAddress
    if (!userAddress) {
        res.writeHead(302, {
            'Location': '/login'
        })
        res.end()
    }
    const platformData = await (await fetch(process.env.API_HOST + '/platformData')).json()
    const userData = await (await fetch(process.env.API_HOST + '/userData/' + userAddress)).json()
    res.render('qrCodes', {
        host: process.env.SERVER_HOST,
        title: 'Códigos QR',
        url: 'qrCodes',
        userData: userData.payload,
        platformData: platformData.payload
    })
}

module.exports.renderTransactions = async function (req, res) {
    const userAddress = req.cookies.userAddress
    if (!userAddress) {
        res.writeHead(302, {
            'Location': '/login'
        })
        res.end()
    }
    const platformData = await (await fetch(process.env.API_HOST + '/platformData')).json()
    const userData = await (await fetch(process.env.API_HOST + '/userData/' + userAddress)).json()
    res.render('transactions', {
        host: process.env.SERVER_HOST,
        title: 'Transacciones',
        url: 'transactions',
        userData: userData.payload,
        platformData: platformData.payload,
        etherscanExplorer: process.env.ETHERSCAN_EXPLORER_URL
    })
}

module.exports.renderStats = async function (req, res) {
    const userAddress = req.cookies.userAddress
    if (!userAddress) {
        res.writeHead(302, {
            'Location': '/login'
        })
        res.end()
    }
    const platformData = await (await fetch(process.env.API_HOST + '/platformData')).json()
    const userData = await (await fetch(process.env.API_HOST + '/userData/' + userAddress)).json()
    res.render('stats', {
        host: process.env.SERVER_HOST,
        title: 'Estadísticas',
        url: 'stats',
        userData: userData.payload,
        platformData: platformData.payload,        
    })
}

module.exports.renderReferrals = async function (req, res) {
    const userAddress = req.cookies.userAddress
    if (!userAddress) {
        res.writeHead(302, {
            'Location': '/login'
        })
        res.end()
    }
    const platformData = await (await fetch(process.env.API_HOST + '/platformData')).json()
    const userData = await (await fetch(process.env.API_HOST + '/userData/' + userAddress)).json()
    res.render('referrals', {
        host: process.env.SERVER_HOST,
        api: process.env.API_HOST,
        title: 'Referidos',
        url: 'referrals',
        
        userData: userData.payload,
        platformData: platformData.payload,        
    })
}

module.exports.renderUplines = async function (req, res) {
    const userAddress = req.cookies.userAddress
    if (!userAddress) {
        res.writeHead(302, {
            'Location': '/login'
        })
        res.end()
    }
    const platformData = await (await fetch(process.env.API_HOST + '/platformData')).json()
    const userData = await (await fetch(process.env.API_HOST + '/userData/' + userAddress)).json()
    res.render('uplines', {
        host: process.env.SERVER_HOST,        
        title: 'Líneas Ascendentes',
        url: 'uplines',
        etherscanExplorer: process.env.ETHERSCAN_EXPLORER_URL,
        userData: userData.payload,
        platformData: platformData.payload,        
    })
}