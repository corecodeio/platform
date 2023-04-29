const { Postulation, Course, Message } = require('./../../utils/db');
//Postulation details
module.exports = async (req, res, next) => {
    try {
        const userId = req.user.id;
        var id = req.params.id;
        const responsePostulation = await Postulation.findOne({
            where: {
                user_id: userId,
                id: id
            },
            include: [
                {
                    model: Message,
                    as: 'messages'
                }
            ]
        });
        const responseCourse = await Course.findOne({
            where: {
                id: responsePostulation.course_id
            }
        });
        res.status(200).json({
            successful: true,
            data: responsePostulation,
            course: responseCourse
        });
    } catch (error) {
        res.status(400).json({ successful: false, message: error });
    }
};
