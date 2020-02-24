module.exports = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        referrerId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        level: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    })
}