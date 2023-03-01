const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define(
        'Survey',
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                unique: true
            },
            course_to_apply: {
                type: DataTypes.STRING,
                allowNull: false
            },
            where_did_you_find_us: {
                type: DataTypes.STRING,
                allowNull: false
            },
            prior_knowledge: {
                type: DataTypes.STRING,
                allowNull: false
            },
            employment_status: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        { timestamps: false }
    );
};
