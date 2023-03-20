const { Course, CourseType, Staff } = require('./../../utils/db.js');
const { validateID, validateNumber } = require('./../../helpers/validators');
const { v4: uuidv4 } = require('uuid');
const createSlackChannel = require('./../../utils/slack/controllers/create_slack_channel');
const addUserChannel = require('./../../utils/slack/controllers/add_user_channel');
const createCalendar = require('./../../utils/calendar/controllers/create_calendar');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//Create Course
module.exports.createCourse = async (req, res, next) => {
    try {
        const { name_bootcamp, type, zoom_url, zoom_code } = req.body;
        if (!name_bootcamp || !type) {
            return res.status(200).json({ successful: false, message: 'missing to enter data' });
        }
        const nameAvailable = await Course.findOne({
            where: { name: name_bootcamp }
        });
        if (nameAvailable) {
            return res.status(200).json({ successful: false, message: 'name is busy' });
        }
        if (!validateID(type)) {
            return res
                .status(200)
                .json({ successful: false, message: 'the course type id is not valid' });
        }
        const courseTypeAvailable = await CourseType.findOne({
            where: { id: type }
        });
        if (!courseTypeAvailable) {
            return res
                .status(200)
                .json({ successful: false, message: 'course type id does not exist' });
        }
        const newCourse = await Course.create({
            id: uuidv4(),
            name: name_bootcamp,
            zoom_url,
            zoom_code
        });
        res.status(200).json({
            successful: true,
            course: newCourse,
            message: 'course created successfully.'
        });
    } catch (error) {
        res.status(400).json({ successful: false, message: error });
    }
};
//Create Slack
module.exports.createSlack = async (req, res, next) => {
    try {
        const { id, slack_name } = req.body;
        if (!id || !slack_name) {
            return res.status(200).json({ successful: false, message: 'missing to enter data' });
        }
        if (!validateID(id)) {
            return res
                .status(200)
                .json({ successful: false, message: 'the course id is not valid' });
        }
        const courseResult = await Course.findOne({
            where: { id: id }
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
//List Course
module.exports.listCourse = async (req, res, next) => {
    try {
        const { page } = req.query;
        if (!page) {
            return res.status(200).json({ successful: false, message: 'missing to enter data' });
        }
        if (!validateNumber(page)) {
            return res.status(200).json({ successful: false, message: 'not a valid number' });
        }
        let limit = 10;
        let offset = 0 + (page - 1) * limit;
        let arg = {
            offset: offset,
            limit: limit,
            order: [['name', 'ASC']]
        };
        const responseList = await Course.findAndCountAll(arg);
        res.status(200).json({
            successful: true,
            list: responseList.rows,
            totalPage: Math.ceil(responseList.count / limit),
            page: page
        });
    } catch (error) {
        res.status(400).json({ successful: false, message: error });
    }
};
//Edit Course
module.exports.editCourse = async (req, res, next) => {
    try {
        const { id, zoom_url, zoom_code } = req.body;
        if (!id) {
            return res.status(200).json({ successful: false, message: 'missing to enter data' });
        }
        if (!validateID(id)) {
            return res.status(200).json({ successful: false, message: 'invalid ID' });
        }
        if (zoom_code && !validateNumber(zoom_code)) {
            return res.status(200).json({ successful: false, message: 'the code is invalid' });
        }
        const courseResult = await Course.findOne({
            where: { id: id }
        });
        if (!courseResult) {
            return res.status(200).json({ successful: false, message: 'ID does not exist' });
        }
        courseResult.zoom_url = zoom_url;
        courseResult.zoom_code = zoom_code;
        await courseResult.save();
        res.status(200).json({
            successful: true,
            message: 'edit course successful'
        });
    } catch (error) {
        res.status(400).json({ successful: false, message: error });
    }
};
