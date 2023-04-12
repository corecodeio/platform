const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define(
        'Role',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                unique: true
            },
            name: {
                type: DataTypes.STRING(40),
                allowNull: false,
                unique: true
            }
        },
        { timestamps: false }
    );
};
