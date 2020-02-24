module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        referralAddress: {
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
        }
    })
}