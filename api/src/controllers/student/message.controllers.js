const { Postulation, Message } = require('./../../utils/db');

//New Postulation
module.exports.send = async (req, res, next) => {
    console.log('aqui');
    const userId = req.user.id;
    const { postulation_id, text } = req.body;
    try {
        const responsePostulation = await Postulation.findOne({
            where: { id: postulation_id, user_id: userId }
        });
        if (!text) {
            return res.status(200).json({
                successful: false,
                message: 'empty message'
            });
        }
        if (!responsePostulation) {
            return res.status(200).json({
                successful: false,
                message: 'application not found'
            });
        }
        const newMessage = await Message.create({
            text,
            author: true
        });
        responsePostulation.addMessage(newMessage.id);
        return res.status(200).json({
            successful: true,
            message: 'message sent'
        });
    } catch (error) {
        console.log(error);
        res.status(200).json({ successful: false, message: 'error server' });
    }
};
