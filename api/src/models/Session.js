const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define(
        'Session',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                unique: true
            },
            event_id: {
                type: DataTypes.STRING,
                unique: true
            },
            start: {
                type: DataTypes.DATE
            },
            end: {
                type: DataTypes.DATE
            },
            date: {
                type: DataTypes.DATE
            },
            type: {
                type: DataTypes.STRING
            },
            activity: {
                type: DataTypes.STRING
            },
            topic: {
                type: DataTypes.STRING
            },
            sub_topic: {
                type: DataTypes.STRING
            }
        },
        { timestamps: true }
    );
};
