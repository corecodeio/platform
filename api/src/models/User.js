const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define(
        'User',
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                unique: true
            },
            first_name: {
                type: DataTypes.STRING
            },
            last_name: {
                type: DataTypes.STRING
            },
            email: {
                type: DataTypes.STRING,
                unique: true
            },
            validate_email: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            country: {
                type: DataTypes.STRING
            },
            phone: {
                type: DataTypes.STRING
            },
            password: {
                type: DataTypes.STRING
            },
            locked: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        },
        { timestamps: true }
    );
};
