const { User } = require('./../../../utils/db.js'); 
const appSlack = require('./../appSlack');

async function idSlackFinder(email) {
  try {
    const result = await appSlack.client.users.lookupByEmail({ email });
    const user=result.user;
    const slackId=user.id;
  return user ? slackId : null;
}catch (error) {
    console.error('Error al buscar usuario de Slack por correo electrónico:', error.data.error);
    
  }
}

async function updateRecord(email, slackId) {
  try {
    const userRecord = await User.findOne({ where: {email: email } });
    if (userRecord) {
      userRecord.slack_id = slackId;
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
