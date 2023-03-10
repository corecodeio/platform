const { CourseType } = require('./../../utils/db.js');

//List Course Type
module.exports.listCourseType = async (req, res, next) => {
    try {
        const responseList = await CourseType.findAll();
        res.status(200).json({
            successful: true,
            list: responseList
        });
    } catch (error) {
        res.status(400).json({ successful: false, message: error });
    }
};
