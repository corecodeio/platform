const { Course } = require('./../../utils/db.js');
const { validateID } = require('./../../helpers/validators');
//Change Course Date
module.exports = async (req, res, next) => {
    try {
        const { courseID, start, end } = req.body;
        if (!courseID || !start || !start) {
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
        courseResult.start = start;
        courseResult.end = end;
        await courseResult.save();
        res.status(200).json({
            successful: true,
            message: 'calendar created successfully'
        });
    } catch (error) {
        res.status(400).json({ successful: false, message: error });
    }
};
