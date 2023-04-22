const { Postulation, Course, Message } = require('./../../utils/db');

//New Postulation
module.exports.newPostulation = async (req, res, next) => {
    const userId = req.user.id;
    const { course_id, adult, knowledge_level, reference } = req.body;
    try {
        const responsePostulation = await Postulation.findOne({
            where: {
                user_id: userId,
                course_id
            }
        });
        if (responsePostulation) {
            return res.status(200).json({
                successful: false,
                message: 'there is already an application for this course'
            });
        }
        const newPostulation = await Postulation.create({
            user_id: userId,
            course_id,
            adult,
            knowledge_level,
            reference
        });
        const newMessage = await Message.create({
            text: `¡Hola!

            Gracias por tu interés en nuestro curso. En Core Code valoramos mucho tu dedicación y estamos emocionados de considerarte como parte de nuestra comunidad.
            
            Actualmente estamos revisando todas las solicitudes y nos pondremos en contacto contigo pronto. Agradecemos tu paciencia mientras evaluamos todas las aplicaciones cuidadosamente.
            
            ¡Saludos cordiales!
            El equipo de Core Code`
        });
        newPostulation.addMessage(newMessage.id);
        return res.status(200).json({
            successful: true,
            message: 'successfully registered application'
        });
    } catch (error) {
        console.log(error);
        res.status(200).json({ successful: false, message: 'error server' });
    }
};
//list Postulation
module.exports.listPostulation = async (req, res, next) => {
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
//Postulation details
module.exports.postulationDetails = async (req, res, next) => {
    try {
        const userId = req.user.id;
        var id = req.params.id; //or use req.param('id')
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
