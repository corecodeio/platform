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
            country: {
                type: DataTypes.STRING
            },
            city: {
                type: DataTypes.STRING
            },
            address: {
                type: DataTypes.STRING
            },
            linkedin_url: {
                type: DataTypes.STRING
            },
            slack_id: {
                type: DataTypes.STRING
            },
            invite_slack: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            locked: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        },
        { timestamps: true }
    );
};
