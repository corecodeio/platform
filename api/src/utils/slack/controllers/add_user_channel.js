const appSlack = require('./../appSlack');

module.exports = async ({ channel, users }) => {
    try {
        await appSlack.client.conversations.invite({ channel, users });
        return { successful: true };
    } catch (error) {
        return { successful: false, error: error.data.error };
    }
};
