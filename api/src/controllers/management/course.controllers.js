const { Course, CourseType, Staff } = require('./../../utils/db.js');
const { validateID } = require('./../../helpers/validators');
const { v4: uuidv4 } = require('uuid');
const createSlackChannel = require('./../../utils/slack/controllers/create_slack_channel');
const addUserChannel = require('./../../utils/slack/controllers/add_user_channel');
const createCalendar = require('./../../utils/calendar/controllers/create_calendar');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//Create Course
module.exports.createCourse = async (req, res, next) => {
    try {
        const { name, type, slack_name, google_calendar_name, zoom_url, zoom_code } = req.body;
        if (!name || !type || !slack_name || !google_calendar_name) {
            return res.status(200).json({ successful: false, message: 'Missing to enter data.' });
        }
        const nameAvailable = await Course.findOne({
            where: { name: name }
        });
        if (nameAvailable) {
            return res.status(200).json({ successful: false, message: 'name is busy.' });
        }
        if (!validateID(type)) {
            return res
                .status(200)
                .json({ successful: false, message: 'the course type id is not valid.' });
        }
        const courseTypeAvailable = await CourseType.findOne({
            where: { id: type }
        });
        if (!courseTypeAvailable) {
            return res
                .status(200)
                .json({ successful: false, message: 'course type id does not exist.' });
        }
        const newCourse = await Course.create({
            id: uuidv4(),
            name,
            slack_id: '',
            slack_name: '',
            google_calendar_id: '',
            google_calendar_name: '',
            zoom_url,
            zoom_code
        });

        const responseCreateSlack = await createSlackChannel(slack_name, false);
        if (responseCreateSlack.successful) {
            await newCourse.update({ slack_id: responseCreateSlack.id, slack_name: slack_name });
            try {
                const guestList = await Staff.findAll({
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
        }
        res.status(200).json({
            successful: true,
            message: 'course created successfully.'
        });
    } catch (error) {
        res.status(400).json({ successful: false, message: error });
    }
};
//List Course
module.exports.listCourse = async (req, res, next) => {
    try {
        const responseList = await Course.findAll();
        res.status(200).json({
            successful: true,
            list: responseList
        });
    } catch (error) {
        res.status(400).json({ successful: false, message: error });
    }
};
