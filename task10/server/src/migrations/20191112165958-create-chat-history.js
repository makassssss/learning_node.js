module.exports = {
  up: (queryInterface, Sequelize) => (
      queryInterface.createTable('chatHistory', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        from: {
          type: Sequelize.STRING
        },
        to: {
          type: Sequelize.STRING
        },
        text: {
          type: Sequelize.STRING
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      })
  ),

  down: queryInterface => queryInterface.dropTable('chatHistory'),
};