const schedule = require('node-schedule');
const { serverConfig } = require('./../../config/index');

module.exports = (eventRecord) => {
    const runAt = new Date(eventRecord.start);

    if (!serverConfig.channel_slack_celebration || Number.isNaN(runAt.getTime())) {
        return null;
    }

    return schedule.scheduleJob(runAt, async () => {
        try {
            const appSlack = require('./../slack/appSlack');
            const response = await appSlack.client.chat.postMessage({
                channel: serverConfig.channel_slack_celebration,
                text: eventRecord.daily_message
            });

            await eventRecord.update({
                ts_daily_message: response.ts,
                sent: true
            });
        } catch (error) {
            console.log(error);
        }
    });
};
