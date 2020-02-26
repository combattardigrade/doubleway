module.exports = (sequelize, DataTypes) => {
    return sequelize.define('event', {
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        userAddress: {
            type: DataTypes.STRING,
            allowNull: true
        },
        referrer: {
            type: DataTypes.STRING,
            allowNull: true
        },
        time: {
            type: DataTypes.STRING,
            allowNull: true
        },
        level: {
            type: DataTypes.STRING,
            allowNull: true
        },
        referral: {
            type: DataTypes.STRING,
            allowNull: true
        },
        txHash: {
            type: DataTypes.STRING,
            allowNull: true,            
        },
        // chUpline: {
        //     type: DataTypes.STRING,
        //     allowNull: true
        // },
        // chId: {
        //     type: DataTypes.STRING,
        //     allowNull: true
        // },
        // dwId: {
        //     type: DataTypes.STRING,
        //     allowNull: true
        // }
    })
}