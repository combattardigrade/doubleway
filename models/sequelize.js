const Sequelize = require('sequelize')
const UserModel = require('./user')
const TxModel = require('./tx')

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
)

const User = UserModel(sequelize, Sequelize)
const Tx = TxModel(sequelize,Sequelize)

sequelize.sync({force: false})
    .then(() => {
        console.log('Database & tables created')
    })

module.exports = {
    User,
    Tx,
    sequelize
}