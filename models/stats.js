module.exports = (sequelize, DataTypes) => {
    return sequelize.define('stats', {
        totalUsers: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        btc_usd: {
            type: DataTypes.STRING,
            allowNull: true
        },
        eth_usd: {
            type: DataTypes.STRING,
            allowNull: true
        }
    })
}