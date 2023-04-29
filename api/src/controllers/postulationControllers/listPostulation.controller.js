const { Postulation, Course } = require('./../../utils/db');
//list Postulation
module.exports = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const PostulationResult = await Postulation.findAll({
            where: { user_id: userId }
        });
        const response = await Promise.all(
            PostulationResult.map(async (postulation) => {
                const responsePostulation = await Course.findOne({
                    where: {
                        id: postulation.course_id
                    }
                });
                return {
                    id: postulation.id,
                    createdAt: postulation.createdAt,
                    status: postulation.status,
                    course_id: responsePostulation.id,
                    course_name: responsePostulation.name,
                    course_technologies: responsePostulation.technologies
                };
            })
        );
        res.status(200).json({ successful: true, data: response });
    } catch (error) {
        res.status(400).json({ successful: false, message: error });
    }
};
