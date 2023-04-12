const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define(
        'Course',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                unique: true
            },
            name: {
                type: DataTypes.STRING,
                unique: true
            },
            slack_id: {
                type: DataTypes.STRING,
                unique: true
            },
            slack_name: {
                type: DataTypes.STRING,
                unique: true
            },
            google_calendar_id: {
                type: DataTypes.STRING,
                unique: true
            },
            google_calendar_name: {
                type: DataTypes.STRING
            },
            zoom_url: {
                type: DataTypes.STRING
            },
            zoom_code: {
                type: DataTypes.STRING
            },
            status: {
                type: DataTypes.STRING,
                defaultValue: 'pending'
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
                defaultValue: 45
            },
            start: {
                type: DataTypes.DATE
            },
            extra_alert: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        },
        { timestamps: false }
    );
};
