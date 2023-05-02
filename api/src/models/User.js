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
                type: DataTypes.STRING,
                defaultValue: ''
            },
            last_name: {
                type: DataTypes.STRING,
                defaultValue: ''
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
                type: DataTypes.STRING,
                defaultValue: ''
            },
            country: {
                type: DataTypes.STRING,
                defaultValue: ''
            },
            city: {
                type: DataTypes.STRING,
                defaultValue: ''
            },
            address: {
                type: DataTypes.STRING,
                defaultValue: ''
            },
            linkedin_url: {
                type: DataTypes.STRING,
                defaultValue: ''
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
