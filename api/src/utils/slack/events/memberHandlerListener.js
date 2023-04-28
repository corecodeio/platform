const { WebClient } = require('@slack/web-api');
const { Staff, User } = require('./src/models');
const slackClient = new WebClient(process.env.SLACK_BOT_USER_OAUTH_TOKEN);


slackClient.on('team_join', async (event) => {
  const { email, id: slackId } = event.user;
  const staffRecord = await Staff.findOne({ where: {email: email } });
  const userRecord = await User.findOne({ where: { email: email } });

  if (staffRecord) {
    staffRecord.slack_id = slackId;
    await staffRecord.save();
  }

  if (userRecord) {
    userRecord.slack_id = slackId;
    await userRecord.save();
  }
});