const { User } = require('./../../db')
module.exports = async ({ event }) => {
    try {        
        console.log('team_join');
        const slackId = event.user.id
        const email = event.user.profile.email
        const userRecord = await User.findOne({ where: {email: email } });
        if (userRecord) {
          userRecord.slack_id = slackId;
          await userRecord.save();
          console.log('user slack id updated')
        }
    
    } catch (error) {
        console.error(error.data.error)
    }
};
