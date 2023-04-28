const { WebClient } = require('@slack/web-api');
const { User } = require('./../../../utils/db.js'); 

const slackClient = new WebClient(process.env. SLACK_BOT_USER_OAUTH_TOKEN);

async function idSlackFinder(email) {
  try {
    const result = await slackClient.users.lookupByEmail({ email });
    const user=result.user;
    const slackId=user.id;
  return user ? slackId : null;
}catch (error) {
    console.error('Error al buscar usuario de Slack por correo electrónico:', error);
    
  }
}

async function updateRecord(email, slackId) {
  try {
    const userRecord = await User.findOne({ where: {email: email } });
    console.log(userRecord.dataValues)
    if (userRecord) {
      userRecord.dataValues.slack_id = slackId;
      console.log(userRecord.dataValues)
      await userRecord.save();
    }
  } catch (error) {
    console.error('Error al actualizar registro de usuario:', error);
  }
}

module.exports = {
  idSlackFinder,
  updateRecord,
};
