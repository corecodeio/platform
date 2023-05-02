const { Course, User } = require('./../../utils/db.js');
const { validateID } = require('./../../helpers/validators');
const createSlackChannel = require('./../../utils/slack/controllers/create_slack_channel');
const addUserChannel = require('./../../utils/slack/controllers/add_user_channel');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
//Create Slack
module.exports = async (req, res, next) => {
    try {
        const { courseID, slack_name } = req.body;
        if (!courseID || !slack_name) {
            return res.status(200).json({ successful: false, message: 'missing to enter data' });
        }
        if (!validateID(courseID)) {
            return res
                .status(200)
                .json({ successful: false, message: 'the course id is not valid' });
        }
        const courseResult = await Course.findOne({
            where: { id: courseID }
        });
        if (!courseResult) {
            return res
                .status(200)
                .json({ successful: false, message: 'the course does not exist' });
        }
        if (courseResult.slack_id) {
            return res
                .status(200)
                .json({ successful: false, message: 'the course already has a slack channel' });
        }
        const responseCreateSlack = await createSlackChannel(slack_name, false);
        if (responseCreateSlack.successful) {
            await courseResult.update({ slack_id: responseCreateSlack.id, slack_name: slack_name });
            try {
                const guestList = await User.findAll({
                    where: {
                        invite_slack: true,
                        slack_id: {
                            [Op.not]: null // Like: slack_id IS NOT NULL
                        }
                    }
                });
                if (guestList) {
                    let user_ids = '';
                    guestList.map((staff) => {
                        user_ids += staff.slack_id + ',';
                    });
                    await addUserChannel({ channel: responseCreateSlack.id, users: user_ids });
                }
            } catch (error) {
                console.log(error);
            }
            res.status(200).json({
                successful: true,
                message: 'slack channel created with success'
            });
        } else {
            res.status(200).json({
                successful: false,
                message: responseCreateSlack.error
            });
        }
    } catch (error) {
        res.status(400).json({ successful: false, message: error });
    }
};
