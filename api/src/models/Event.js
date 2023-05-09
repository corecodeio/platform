const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define(
        'Event',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                unique: true
            },
            name: {
                type: DataTypes.STRING
            },
            calendar_id: {
                type: DataTypes.STRING
            },
            calendar_event_id: {
                type: DataTypes.STRING,
                unique: true
            },
            start: {
                type: DataTypes.DATE
            },
            end: {
                type: DataTypes.DATE
            },
            type: {
                type: DataTypes.STRING,
                validate: {
                    isIn: [['daily message', 'celebration', 'meet', 'code session']]
                }
            },
            calendar_description: {
                type: DataTypes.STRING
            },
            daily_message: {
                type: DataTypes.STRING
            },
            slack_message: {
                type: DataTypes.STRING
            },
            sent: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            course_id: {
                type: DataTypes.UUID
            },
            link_meet: {
                type: DataTypes.STRING
            },
            ts_slack_message: {
                type: DataTypes.STRING
            },
            ts_daily_message: {
                type: DataTypes.STRING
            }
        },
        { timestamps: true }
    );
};
