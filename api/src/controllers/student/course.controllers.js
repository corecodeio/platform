const { Course, User } = require('./../../utils/db.js');

//My courses
module.exports.myCourses = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId, { include: 'courses' });
    const coursesResult = await Promise.all(
      user.courses.map(async (course) => {
        const count = await Course.countUsers();
        return {
          id: course.id,
          bookings: count,
        };
      })
    );
    res.status(200).json({ successful: true, data: coursesResult });
  } catch (error) {
    console.log(error)
    res.status(400).json({ successful: false, message: error });
  }
};
//list of available courses
module.exports.availableCourses = async (req, res, next) => {
    try {
        const coursesResult = await Course.findAll({
            where: { status: 'open' }
        });
        res.status(200).json({ successful: true, data: coursesResult });
    } catch (error) {
        res.status(400).json({ successful: false, message: error });
    }
};
