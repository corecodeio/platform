const { Course, User } = require('./../../utils/db.js');

//My courses
module.exports.myCourses = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const user = await User.findByPk(userId, {
            include: [
                {
                    model: Course,
                    as: 'courses',
                    include: [
                        {
                            model: User,
                            as: 'courses'
                        }
                    ]
                }
            ]
        });
        const response = user.courses.map((course) => {
            return {
                id: course.id,
                title: course.title,
                title_second: course.title_second,
                title_extra: course.title_extra,
                type: course.type,
                duration: course.duration,
                level: course.level,
                technologies: course.technologies,
                price: course.price,
                minimum: course.minimum,
                extra_alert: course.extra_alert,
                bookings: course.courses.length
            };
        });
        res.status(200).json({ successful: true, data: response });
    } catch (error) {
        console.log(error);
        res.status(400).json({ successful: false, message: error });
    }
};
//list of available courses
module.exports.availableCourses = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const coursesResult = await Course.findAll({
            where: { status: 'open' },
            include: [
                {
                    model: User,
                    as: 'courses'
                }
            ]
        });
        const response = coursesResult.map((course) => {
            const subscribed = course.courses.filter((user) => user.id === userId).length;
            return {
                id: course.id,
                title: course.title,
                title_second: course.title_second,
                title_extra: course.title_extra,
                type: course.type,
                duration: course.duration,
                level: course.level,
                technologies: course.technologies,
                price: course.price,
                minimum: course.minimum,
                extra_alert: course.extra_alert,
                bookings: course.courses.length,
                subscribed: subscribed === 0
            };
        });
        res.status(200).json({ successful: true, data: response });
    } catch (error) {
        res.status(400).json({ successful: false, message: error });
    }
};
