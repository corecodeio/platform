const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { postgresConfig } = require('./../config/index.js');

const sequelize = new Sequelize(
    `postgres://${postgresConfig.user}:${postgresConfig.password}@${postgresConfig.host}:${postgresConfig.port}/${postgresConfig.name}`,
    {
        logging: false,
        native: false
    }
);

const basename = path.basename(__filename);

const modelDefiners = [];

// We read all the files from the Models folder, require them and add them to the modelDefiners array
fs.readdirSync(path.join(__dirname, '../models'))
    .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
    .forEach((file) => {
        modelDefiners.push(require(path.join(__dirname, '../models', file)));
    });

// Inject the connection (sequelize) to all models
modelDefiners.forEach((model) => model(sequelize));

// We capitalize the names of the models ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);

sequelize.models = Object.fromEntries(capsEntries);

const { User, Survey } = sequelize.models;

Survey.hasOne(User, {
    foreignKey: 'surveyID'
});

module.exports = {
    ...sequelize.models,
    db: sequelize
};
