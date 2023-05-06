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
                defaultValue: 'Pending'
            },
            title: {
                type: DataTypes.STRING
            },
            title_second: {
                type: DataTypes.STRING
            },
            title_extra: {
                type: DataTypes.STRING
            },
            type: {
                type: DataTypes.STRING
            },
            duration: {
                type: DataTypes.STRING
            },
            level: {
                type: DataTypes.INTEGER
            },
            technologies: {
                type: DataTypes.STRING
            },
            price: {
                type: DataTypes.STRING
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
        { timestamps: true }
    );
};
