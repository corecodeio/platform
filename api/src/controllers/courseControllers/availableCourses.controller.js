const { Course, User, Postulation } = require('./../../utils/db');
//list of available courses
module.exports = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const coursesResult = await Course.findAll({
            where: { status: 'Open' },
            include: [
                {
                    model: User,
                    as: 'courses'
                }
            ]
        });
        console.log('aqui', coursesResult);
        const response = await Promise.all(
            coursesResult.map(async (course) => {
                const responsePostulation = await Postulation.findOne({
                    where: {
                        user_id: userId,
                        course_id: course.id
                    }
                });
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
                    subscribed: responsePostulation ? true : false
                };
            })
        );
        res.status(200).json({ successful: true, data: response });
    } catch (error) {
        res.status(400).json({ successful: false, message: error });
    }
};
