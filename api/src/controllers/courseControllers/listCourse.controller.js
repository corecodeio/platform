const { Course } = require('./../../utils/db.js');
const { validateNumber } = require('./../../helpers/validators');

//List Course
module.exports = async (req, res, next) => {
    try {
        const { page } = req.query;
        if (!page) {
            return res.status(200).json({ successful: false, message: 'missing to enter data' });
        }
        if (!validateNumber(page)) {
            return res.status(200).json({ successful: false, message: 'not a valid number' });
        }
        let limit = 10;
        let offset = 0 + (page - 1) * limit;
        let arg = {
            offset: offset,
            limit: limit,
            order: [['name', 'ASC']]
        };
        const responseList = await Course.findAndCountAll(arg);
        res.status(200).json({
            successful: true,
            list: responseList.rows,
            totalPage: Math.ceil(responseList.count / limit),
            page: page
        });
    } catch (error) {
        res.status(400).json({ successful: false, message: error });
    }
};
