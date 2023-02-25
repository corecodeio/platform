const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define(
		'Permission',
		{
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				unique: true,
			},
			name: {
				type: DataTypes.STRING(40),
				allowNull: false,
                unique: true,
			},
		},
		{ timestamps: false }
	);
};
