module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        referrerAddress: {
            type: DataTypes.STRING,
            allowNull: true
        },        
        referrerId: {
            type: DataTypes.STRING,
            allowNull: true
        },
        level: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 1
        },
        level1Exp: {
            type: DataTypes.STRING,
            allowNull: true
        },
        level2Exp: {
            type: DataTypes.STRING,
            allowNull: true
        },
        level3Exp: {
            type: DataTypes.STRING,
            allowNull: true
        },
        level4Exp: {
            type: DataTypes.STRING,
            allowNull: true
        },
        level5Exp: {
            type: DataTypes.STRING,
            allowNull: true
        },
        level6Exp: {
            type: DataTypes.STRING,
            allowNull: true
        },
        level7Exp: {
            type: DataTypes.STRING,
            allowNull: true
        },
        level8Exp: {
            type: DataTypes.STRING,
            allowNull: true
        },
    })
}

