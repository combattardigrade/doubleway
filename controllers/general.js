const fetch = require('node-fetch')

module.exports.renderHome = async function (req, res) {
    if(req.query.rid) { 
        const response = await (await fetch(process.env.API_HOST + `/checkRefId/${req.query.rid}`)).json()
        if(response.status == 'OK') res.cookie('rid', req.query.rid, { httpOnly: true, secure: process.env.NODE_ENV == 'production' })   
    }    
    res.render('home', {
        host: process.env.SERVER_HOST,
        title: 'Inicio',
        homePage: true,
        url: 'home'
    })
}

module.exports.renderLogin = async function (req, res) {
    if (req.query.rid) {
        const response = await (await fetch(process.env.API_HOST + `/checkRefId/${req.query.rid}`)).json()
        if (response.status == 'OK') res.cookie('rid', req.query.rid, { httpOnly: true, secure: process.env.NODE_ENV == 'production' })
    }
    res.render('login', {
        host: process.env.SERVER_HOST,
        title: 'Iniciar sesión',
        url: 'login'
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
    res.render('signup', {
        host: process.env.SERVER_HOST,
        title: 'Registrar cuenta',
        url: 'signup',
        rid: rid ? rid : req.cookies.rid ? req.cookies.rid : null
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
        // Redirect to login
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