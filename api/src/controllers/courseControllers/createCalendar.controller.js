const { Course } = require('./../../utils/db.js');
const { validateID } = require('./../../helpers/validators');
const createCalendar = require('./../../utils/calendar/controllers/create_calendar');
//Create Calendar
module.exports = async (req, res, next) => {
    try {
        const { courseID, google_calendar_name } = req.body;
        if (!courseID || !google_calendar_name) {
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
        if (courseResult.google_calendar_id) {
            return res.status(200).json({
                successful: false,
                message: 'the course already has an existing schedule'
            });
        }
        const responseCreateCalendar = await createCalendar({
            calendar_name: google_calendar_name,
            calendar_description: 's'
        });
        console.log(responseCreateCalendar);
    } catch (error) {}
};
