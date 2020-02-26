module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        referrerLevel1: {
            type: DataTypes.STRING,
            allowNull: true
        },        
        referrerLevel2: {
            type: DataTypes.STRING,
            allowNull: true
        },
        referrerLevel3: {
            type: DataTypes.STRING,
            allowNull: true
        },
        referrerLevel4: {
            type: DataTypes.STRING,
            allowNull: true
        },
        referrerLevel5: {
            type: DataTypes.STRING,
            allowNull: true
        },
        referrerLevel6: {
            type: DataTypes.STRING,
            allowNull: true
        },
        referrerLevel7: {
            type: DataTypes.STRING,
            allowNull: true
        },
        referrerLevel8: {
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

