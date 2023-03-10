const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define(
        'CourseType',
        {
            id: {
                type: DataTypes.UUID,
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
