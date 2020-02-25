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
        },
        launchTime: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: '1582580987'
        },
        facebook: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'https://facebook.com'
        },
        twitter: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'https://twitter.com'
        },
        telegram: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'https://telegram.com'
        },
        youtube: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'https://youtube.com'
        },
        level1Price: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        level2Price: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        level3Price: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        level4Price: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        level5Price: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        level6Price: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        level7Price: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        level8Price: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    })
}