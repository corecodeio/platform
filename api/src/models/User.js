const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define(
        'User',
        {
            id: {
                type: DataTypes.STRING,
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
            confirmed_email: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            phone: {
                type: DataTypes.STRING
            },
            confirmed_phone: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            slack_id: {
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
