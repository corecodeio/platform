const { Course } = require('./../../utils/db.js');
const { validateID } = require('./../../helpers/validators');
//Change Course Status
module.exports = async (req, res, next) => {
    try {
        const { courseID, status } = req.body;
        if (!courseID || !status) {
            return res.status(200).json({ successful: false, message: 'missing to enter data' });
        }
        if (!['Pending', 'Open', 'Active ', 'Finished'].includes(status)) {
            return res.status(200).json({ successful: false, message: 'invalid status' });
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
        courseResult.status = status;
        await courseResult.save();
        res.status(200).json({
            successful: true,
            message: 'status changed successfully'
        });
    } catch (error) {
        res.status(400).json({ successful: false, message: error });
    }
};
