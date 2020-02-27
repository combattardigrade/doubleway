require('dotenv').load()
const cors = require('cors')
const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')

const csurf = require('csurf')
const cookieParser = require('cookie-parser')
const routes = require('./routes/index')
// const routesAdmin = require('./app_server/routes/admin')
const app = express()

// app.use(favicon(path.join(__dirname ,'public','favicon','favicon.ico')));
app.use(cors({ origin: '*' }))


// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(express.static(path.join(__dirname, 'public')))


// csrf and cookies
app.use(cookieParser())
app.use(csurf({ cookie: true }))

app.use('/', routes)

const CronJob = require('cron').CronJob
const rp = require('request-promise')
const job = new CronJob('*/30 * * * * *', async function () {
    await rp(process.env.API_HOST + '/updateData')
    console.log('Database updated...')
})

// error handlers
// catch unauthorized errors
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401)
        res.json({ message: err.name + ': ' + err.message })
    } else if (err.code === 'EBADCSRFTOKEN') {
        res.status(403)
        res.send('CSRF verification failed')
    } else if (err.message === 'missing_admin_token_cookie') {
        res.writeHead(302, {
            Location: process.env.SERVER_HOST + '/admin/login'
        })
        res.end()
    } else if (err.message === 'missing_token_cookie') {
        res.writeHead(302, {
            'Location': process.env.SERVER_HOST + '/login'
        });
        res.end();
    }
})


if (process.env.NODE_ENV === 'production') {
    app.set('port', process.env.PORT || 3000);
    app.listen(app.get('port'), function () {
        console.log('Listening on port ' + app.get('port'));
        job.start()
        console.log('Cronjob started...')
    });
} else if (process.env.NODE_ENV === 'dev') {
    app.set('port', process.env.PORT || 3000);
    app.listen(app.get('port'), function () {
        console.log('Listening on port ' + app.get('port'));
        job.start()
        console.log('Cronjob started...')
    });
}

module.exports = app