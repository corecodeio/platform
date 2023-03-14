const appSlack = require('./../appSlack');

module.exports = async (slack_name, is_private = false) => {
    try {
        const response = await appSlack.client.conversations.create({
            name: slack_name,
            is_private: is_private
        });
        return { successful: true, id: response.channel.id };
    } catch (error) {
        return { successful: false, error: error.data.error };
    }
};
