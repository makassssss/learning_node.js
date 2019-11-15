export default (sequelize, DataTypes) => {
    const chatHistory = sequelize.define('chatHistory', {
        from: DataTypes.STRING,
        to: DataTypes.STRING,
        text: DataTypes.STRING,
    }, {
        timestamps: true,
        tableName: 'chatHistory'
    });

    return chatHistory;
};