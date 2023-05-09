const http = require('./http.js');
const { db } = require('./utils/db.js');
const slackApp = require('./utils/slack/appSlack');
const { serverConfig } = require('./config/index.js');
const schedule = require('node-schedule');
const { dailyMessageEvent, checkEvent } = require('./utils/schedule');

db.sync({ force: false })
    .then(async () => {
        await slackApp.start();
        http.listen(serverConfig.port, () => {
            console.log(`Server listening on port: ${serverConfig.port}`);
            try {
                schedule.scheduleJob(serverConfig.daily_message_date, dailyMessageEvent);
                schedule.scheduleJob(serverConfig.check_event_date, checkEvent);
            } catch (error) {
                console.log(error);
            }
        });
    })
    .catch((error) => {
        console.log(error);
    });
