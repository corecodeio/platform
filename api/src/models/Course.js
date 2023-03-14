const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define(
        'Course',
        {
            id: {
                type: DataTypes.UUID,
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
            }
        },
        { timestamps: false }
    );
};
