const fetch = require('node-fetch')

const languages = ['es', 'cn', 'de', 'en', 'fr', 'hi', 'it', 'ja', 'ko', 'ru']

module.exports.renderHome = async function (req, res) {
    if (req.query.rid) {
        const response = await (await fetch(process.env.API_HOST + `/checkRefId/${req.query.rid}`)).json()
        if (response.status == 'OK') res.cookie('rid', req.query.rid, { httpOnly: true, secure: process.env.NODE_ENV == 'production' })
    }
    const platformData = await (await fetch(process.env.API_HOST + '/platformData')).json()
    
    if (req.params.language && languages.includes(req.params.language)) {
        res.cookie('language', req.params.language, { httpOnly: true, secure: process.env.NODE_ENV == 'production' })
    }

    let language, langPage
    if (req.cookies.language && !req.params.language) {
        language = req.cookies.language ? languages.includes(req.cookies.language) ? req.cookies.language : 'es' : 'es'
        langPage = `locales/${language}/home`
    } else {
        language = req.params.language ? languages.includes(req.params.language) ? req.params.language : 'es' : 'es'
        langPage = `locales/${language}/home`
    }

    res.render(langPage, {
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

    if (req.params.language && languages.includes(req.params.language)) {
        res.cookie('language', req.params.language, { httpOnly: true, secure: process.env.NODE_ENV == 'production' })
    }

    let language, langPage
    if (req.cookies.language && !req.params.language) {
        language = req.cookies.language ? languages.includes(req.cookies.language) ? req.cookies.language : 'es' : 'es'
        langPage = `locales/${language}/login`
    } else {
        language = req.params.language ? languages.includes(req.params.language) ? req.params.language : 'es' : 'es'
        langPage = `locales/${language}/login`
    }
    
    res.render(langPage, {
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
    
    if (req.params.language && languages.includes(req.params.language)) {
        res.cookie('language', req.params.language, { httpOnly: true, secure: process.env.NODE_ENV == 'production' })
    }

    let language, langPage
    if (req.cookies.language && !req.params.language) {
        language = req.cookies.language ? languages.includes(req.cookies.language) ? req.cookies.language : 'es' : 'es'
        langPage = `locales/${language}/signup`
    } else {
        language = req.params.language ? languages.includes(req.params.language) ? req.params.language : 'es' : 'es'
        langPage = `locales/${language}/signup`
    }

    res.render(langPage, {
        host: process.env.SERVER_HOST,
        title: 'Registrar cuenta',
        url: 'signup',
        rid: rid ? rid : req.cookies.rid ? req.cookies.rid : null,
        etherscanExplorer: process.env.ETHERSCAN_EXPLORER_URL,
        platformData: platformData.payload
    })
}

module.exports.renderFaq = async function (req, res) {
    const platformData = await (await fetch(process.env.API_HOST + '/platformData')).json()
    
    let language, langPage
    if (req.cookies.language && !req.params.language) {
        language = req.cookies.language ? languages.includes(req.cookies.language) ? req.cookies.language : 'es' : 'es'
        langPage = `locales/${language}/faq`
    } else {
        language = req.params.language ? languages.includes(req.params.language) ? req.params.language : 'es' : 'es'
        langPage = `locales/${language}/faq`
    }    

    res.render(langPage, {
        host: process.env.SERVER_HOST,
        title: 'Preguntas Frecuentes',
        url: 'faq',
        etherscanExplorer: process.env.ETHERSCAN_EXPLORER_URL,
        platformData: platformData.payload
    })
}

module.exports.renderFaqEth = async function (req, res) {
    const platformData = await (await fetch(process.env.API_HOST + '/platformData')).json()
    
    let language, langPage
    if (req.cookies.language && !req.params.language) {
        language = req.cookies.language ? languages.includes(req.cookies.language) ? req.cookies.language : 'es' : 'es'
        langPage = `locales/${language}/faqeth`
    } else {
        language = req.params.language ? languages.includes(req.params.language) ? req.params.language : 'es' : 'es'
        langPage = `locales/${language}/faqeth`
    }
    
    res.render(langPage, {
        host: process.env.SERVER_HOST,
        title: 'Preguntas Frecuentes Sobre Ethereum',
        url: 'faqeth',
        etherscanExplorer: process.env.ETHERSCAN_EXPLORER_URL,
        platformData: platformData.payload
    })
}

module.exports.renderTerminos = async function (req, res) {
    const platformData = await (await fetch(process.env.API_HOST + '/platformData')).json()
    
    let language, langPage
    if (req.cookies.language && !req.params.language) {
        language = req.cookies.language ? languages.includes(req.cookies.language) ? req.cookies.language : 'es' : 'es'
        langPage = `locales/${language}/terminos`
    } else {
        language = req.params.language ? languages.includes(req.params.language) ? req.params.language : 'es' : 'es'
        langPage = `locales/${language}/terminos`
    }

    res.render(langPage, {
        host: process.env.SERVER_HOST,
        title: 'Términos y condiciones',
        url: 'terminos',
        etherscanExplorer: process.env.ETHERSCAN_EXPLORER_URL,
        platformData: platformData.payload
    })
}

module.exports.renderComofunciona = async function (req, res) {
    const platformData = await (await fetch(process.env.API_HOST + '/platformData')).json()
    
    let language, langPage
    if (req.cookies.language && !req.params.language) {
        language = req.cookies.language ? languages.includes(req.cookies.language) ? req.cookies.language : 'es' : 'es'
        langPage = `locales/${language}/comofunciona`
    } else {
        language = req.params.language ? languages.includes(req.params.language) ? req.params.language : 'es' : 'es'
        langPage = `locales/${language}/comofunciona`
    }

    res.render(langPage, {
        host: process.env.SERVER_HOST,
        title: '¿Cómo funciona?',
        url: 'comofunciona',
        etherscanExplorer: process.env.ETHERSCAN_EXPLORER_URL,
        platformData: platformData.payload
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

    let language, langPage
    if (req.cookies.language && !req.params.language) {
        language = req.cookies.language ? languages.includes(req.cookies.language) ? req.cookies.language : 'es' : 'es'
        langPage = `locales/${language}/dashboard`
    } else {
        language = req.params.language ? languages.includes(req.params.language) ? req.params.language : 'es' : 'es'
        langPage = `locales/${language}/dashboard`
    }
    console.log(langPage)

    res.render(langPage, {
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
    
    let language, langPage
    if (req.cookies.language && !req.params.language) {
        language = req.cookies.language ? languages.includes(req.cookies.language) ? req.cookies.language : 'es' : 'es'
        langPage = `locales/${language}/reflinks`
    } else {
        language = req.params.language ? languages.includes(req.params.language) ? req.params.language : 'es' : 'es'
        langPage = `locales/${language}/reflinks`
    }

    res.render(langPage, {
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

    let language, langPage
    if (req.cookies.language && !req.params.language) {
        language = req.cookies.language ? languages.includes(req.cookies.language) ? req.cookies.language : 'es' : 'es'
        langPage = `locales/${language}/qrCodes`
    } else {
        language = req.params.language ? languages.includes(req.params.language) ? req.params.language : 'es' : 'es'
        langPage = `locales/${language}/qrCodes`
    }

    res.render(langPage, {
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
    
    let language, langPage
    if (req.cookies.language && !req.params.language) {
        language = req.cookies.language ? languages.includes(req.cookies.language) ? req.cookies.language : 'es' : 'es'
        langPage = `locales/${language}/transactions`
    } else {
        language = req.params.language ? languages.includes(req.params.language) ? req.params.language : 'es' : 'es'
        langPage = `locales/${language}/transactions`
    }

    res.render(langPage, {
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
    
    let language, langPage
    if (req.cookies.language && !req.params.language) {
        language = req.cookies.language ? languages.includes(req.cookies.language) ? req.cookies.language : 'es' : 'es'
        langPage = `locales/${language}/stats`
    } else {
        language = req.params.language ? languages.includes(req.params.language) ? req.params.language : 'es' : 'es'
        langPage = `locales/${language}/stats`
    }

    res.render(langPage, {
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
    
    let language, langPage
    if (req.cookies.language && !req.params.language) {
        language = req.cookies.language ? languages.includes(req.cookies.language) ? req.cookies.language : 'es' : 'es'
        langPage = `locales/${language}/referrals`
    } else {
        language = req.params.language ? languages.includes(req.params.language) ? req.params.language : 'es' : 'es'
        langPage = `locales/${language}/referrals`
    }

    res.render(langPage, {
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
    
    let language, langPage
    if (req.cookies.language && !req.params.language) {
        language = req.cookies.language ? languages.includes(req.cookies.language) ? req.cookies.language : 'es' : 'es'
        langPage = `locales/${language}/uplines`
    } else {
        language = req.params.language ? languages.includes(req.params.language) ? req.params.language : 'es' : 'es'
        langPage = `locales/${language}/uplines`
    }

    res.render(langPage, {
        host: process.env.SERVER_HOST,
        title: 'Líneas Ascendentes',
        url: 'uplines',
        etherscanExplorer: process.env.ETHERSCAN_EXPLORER_URL,
        userData: userData.payload,
        platformData: platformData.payload,
    })
}

