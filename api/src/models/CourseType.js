const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define(
        'CourseType',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                unique: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            template_name: {
                type: DataTypes.STRING(40),
                allowNull: false
            }
        },
        { timestamps: false }
    );
};
