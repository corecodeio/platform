const http = require('./http.js');
const { db } = require('./utils/db.js');
const slackApp = require('./utils/slack/appSlack');
const { serverConfig } = require('./config/index.js');

db.sync({ force: false })
    .then(async () => {
        await slackApp.start();
        http.listen(serverConfig.port, () => {
            console.log(`Server listening on port: ${serverConfig.port}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
