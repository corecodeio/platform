const stytch = require('stytch');
const { stytchConfig } = require('./../config');

const clientStytch = new stytch.Client({
    project_id: stytchConfig.project_id,
    secret: stytchConfig.secret,
    env: stytch.envs.test
});

module.exports = clientStytch;
