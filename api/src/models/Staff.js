const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define(
        'Staff',
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
            phone: {
                type: DataTypes.STRING
            },
            password: {
                type: DataTypes.STRING
            },
            slack_id:{
                type: DataTypes.STRING
            },
            invite_slack:{
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            locked:{
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        },
        { timestamps: true }
    );
};
