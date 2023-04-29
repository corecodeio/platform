const { Template } = require('./../../utils/db.js');
//List Templates
module.exports = async (req, res, next) => {
    try {
        const responseList = await Template.findAll();
        res.status(200).json({
            successful: true,
            list: responseList
        });
    } catch (error) {
        res.status(200).json({ successful: false, message: error });
    }
};
