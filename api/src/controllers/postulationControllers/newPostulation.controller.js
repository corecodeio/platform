const { Postulation, Message } = require('./../../utils/db');
//New Postulation
module.exports = async (req, res, next) => {
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
