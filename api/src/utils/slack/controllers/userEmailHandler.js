const appSlack = require('./../appSlack');

module.exports = async (email) => {
    try {
        const result = await appSlack.client.users.lookupByEmail({ email });
        const user = result.user;
        const slackId = user.id;
        return user ? slackId : null;
    } catch (error) {
        console.error('Error al buscar usuario de Slack por correo electrónico:', error.data.error);
        return null;
    }
};
