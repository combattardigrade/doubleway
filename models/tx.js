module.exports = (sequelize, DataTypes) => {
    return sequelize.define('txs', {
        blockNumber: {
            type: DataTypes.STRING,
            allowNull: true
        },
        timeStamp: {
            type: DataTypes.STRING,
            allowNull: true
        },
        hash: {
            type: DataTypes.STRING,
            allowNull: true
        },
        transactionIndex: {
            type: DataTypes.STRING,
            allowNull: true
        },
        from: {
            type: DataTypes.STRING,
            allowNull: true
        },
        to: {
            type: DataTypes.STRING,
            allowNull: true
        },
        value: {
            type: DataTypes.STRING,
            allowNull: true
        },
        gas: {
            type: DataTypes.STRING,
            allowNull: true
        },
        gasPrice: {
            type: DataTypes.STRING,
            allowNull: true
        },
        isError: {
            type: DataTypes.STRING,
            allowNull: true
        },
        txreceipt_status: {
            type: DataTypes.STRING,
            allowNull: true
        },
        input: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        contractAddress: {
            type: DataTypes.STRING,
            allowNull: true
        },
        cumulativeGasUsed: {
            type: DataTypes.STRING,
            allowNull: true
        },
        gasUsed: {
            type: DataTypes.STRING,
            allowNull: true
        },
        confirmations: {
            type: DataTypes.STRING,
            allowNull: true
        },
    })
}