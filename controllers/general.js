const fetch = require('node-fetch')

module.exports.renderHome = function(req,res) {    
    res.render('home',{
        host: process.env.SERVER_HOST,
        title: 'Inicio',
        homePage: true,
        url: 'home'
    })
}

module.exports.renderLogin = function(req, res) {
    res.render('login',{
        host: process.env.SERVER_HOST,
        title: 'Iniciar sesión',
        url: 'login'
    })
}

module.exports.renderSignup = function(req, res) {
    res.render('signup',{
        host: process.env.SERVER_HOST,
        title: 'Registrar cuenta',
        url: 'signup'
    })
}

module.exports.renderFaq = function(req, res) {
    res.render('faq',{
        host: process.env.SERVER_HOST,
        title: 'Preguntas Frecuentes',        
        url: 'faq'
    })
}

module.exports.renderFaqEth = function(req, res) {
    res.render('faqeth',{
        host: process.env.SERVER_HOST,
        title: 'Preguntas Frecuentes Sobre Ethereum',
        url: 'faqeth'
    })
}

module.exports.renderTerminos = function(req, res) {
    res.render('terminos',{
        host: process.env.SERVER_HOST,
        title: 'Términos y condiciones',
        url: 'terminos'
    })
}

module.exports.renderComofunciona = function(req, res) {
    res.render('comofunciona',{
        host: process.env.SERVER_HOST,
        title: '¿Cómo funciona?',
        url: 'comofunciona'
    })
}

module.exports.renderDashboard = async function(req, res) {  
    const userAddress = req.cookies.userAddress
    if(!userAddress) {
        // Redirect to login
    }

    const platformData = await (await fetch(process.env.API_HOST + '/platformData')).json()
    const userData = await (await fetch(process.env.API_HOST + '/userData/' + userAddress)).json()
     
    res.render('dashboard',{
        host: process.env.SERVER_HOST,
        title: 'Dashboard',
        url: 'dashboard',
        userData: userData.payload,
        platformData: platformData.payload
    })
}