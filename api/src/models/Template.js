const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define(
        'Template',
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
            title: {
                type: DataTypes.STRING,
                defaultValue: ''
            },
            title_second: {
                type: DataTypes.STRING,
                defaultValue: ''
            },
            title_extra: {
                type: DataTypes.STRING,
                defaultValue: ''
            },
            type: {
                type: DataTypes.STRING,
                defaultValue: ''
            },
            duration: {
                type: DataTypes.STRING,
                defaultValue: ''
            },
            level: {
                type: DataTypes.INTEGER,
                defaultValue: 1
            },
            technologies: {
                type: DataTypes.STRING,
                defaultValue: ''
            },
            price: {
                type: DataTypes.STRING,
                defaultValue: ''
            },
            minimum: {
                type: DataTypes.INTEGER,
                defaultValue: 60
            },
            extra_alert: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        },
        { timestamps: false }
    );
};
