const { App } = require('@slack/bolt');
const { slackConfig } = require('./../../config/index.js');
const teamJoin = require('./events/team_join');
const memberJoinedChannel = require('./events/member_joined_channel');
const memberLeftChannel = require('./events/member_left_channel');

const appSlack = new App(slackConfig);

appSlack.event('team_join', teamJoin);
appSlack.event('member_joined_channel', memberJoinedChannel);
appSlack.event('member_left_channel', memberLeftChannel);

module.exports = appSlack;