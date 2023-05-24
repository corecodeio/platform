const { Course, Session } = require('./../../utils/db.js');
const { validateID } = require('./../../helpers/validators');
//Full Data Course
module.exports = async (req, res, next) => {
    try {
        const { id } = req.query;
        if (!validateID(id)) {
            return res
                .status(200)
                .json({ successful: false, message: 'the course id is not valid' });
        }
        const courseResult = await Course.findOne({
            where: { id: id },
            include: [
                {
                    model: Session,
                    as: 'sessions'
                }
            ]
        });
        if (!courseResult) {
            return res
                .status(200)
                .json({ successful: false, message: 'the course does not exist' });
        }
        res.status(200).json({
            successful: true,
            data: courseResult
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ successful: false, message: error });
    }
};
