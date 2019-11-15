module.exports = {
    up: (queryInterface, Sequelize) => (
        queryInterface.addColumn(
            'employees',
            'department_id',
            {
                type: Sequelize.INTEGER,
                references: {
                    model: 'departments', // name of Source model
                    key: 'department_id',
                },
                onDelete: 'cascade'
            }
        )
    ),

    down: queryInterface => queryInterface.removeColumn(
        'employees',
        'department_id'
    ),
};
