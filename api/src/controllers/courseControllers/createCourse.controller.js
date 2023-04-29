const { Course } = require('./../../utils/db');
//Create Course
module.exports = async (req, res, next) => {
    try {
        const {
            name,
            title,
            title_second,
            title_extra,
            type,
            duration,
            level,
            technologies,
            price,
            minimum
        } = req.body;
        const nameAvailable = await Course.findOne({
            where: { name: name }
        });
        if (nameAvailable) {
            return res.status(200).json({ successful: false, message: 'name is busy' });
        }
        const newCourse = await Course.create({
            name,
            title,
            title_second,
            title_extra,
            type,
            duration,
            level,
            technologies,
            price,
            minimum
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
