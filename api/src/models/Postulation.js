const { DataTypes, Sequelize } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define(
        'Postulation',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                unique: true
            },
            user_id: {
                type: DataTypes.STRING
            },
            course_id: {
                type: DataTypes.UUID
            },
            adult: {
                type: DataTypes.BOOLEAN
            },
            knowledge_level: {
                type: DataTypes.STRING
            },
            reference: {
                type: DataTypes.STRING
            },
            status: {
                type: DataTypes.STRING,
                defaultValue: 'Pending'
            }
        },
        { timestamps: true }
    );
};
