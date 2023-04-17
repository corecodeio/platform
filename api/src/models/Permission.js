const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define(
        'Permission',
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
            }
        },
        { timestamps: false }
    );
};
