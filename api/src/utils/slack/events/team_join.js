const { Staff, User } = require('./../../../models/User.js')
module.exports = async ({ event }) => {
    try {        
        const userRecord = await User.findOne({ where: { email: email } });
        if (userRecord) {
            userRecord.slack_id = slackId;
            await userRecord.save();
            
        }
    } catch (error) {
        console.error(error.data.error)
    }
};
