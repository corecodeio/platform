const { User, Permission, Role, Course } = require('./../utils/db');
const roles = require('./roles');
const permissions = require('./permissions');
const courses = require('./courses');

const preload = async () => {
    try {
        if (
            process.env.SERVER_DEVELOPMENT_USER_ID &&
            process.env.SERVER_DEVELOPMENT_USER_FIRST_NAME &&
            process.env.SERVER_DEVELOPMENT_USER_LAST_NAME &&
            process.env.SERVER_DEVELOPMENT_USER_EMAIL &&
            process.env.SERVER_DEVELOPMENT_USER_PHONE &&
            process.env.SERVER_DEVELOPMENT_USER_SLACK_ID
        ) {
            //-------------- User --------------
            const userCreated = await User.create({
                id: process.env.SERVER_DEVELOPMENT_USER_ID,
                first_name: process.env.SERVER_DEVELOPMENT_USER_FIRST_NAME,
                last_name: process.env.SERVER_DEVELOPMENT_USER_LAST_NAME,
                email: process.env.SERVER_DEVELOPMENT_USER_EMAIL,
                phone: process.env.SERVER_DEVELOPMENT_USER_PHONE,
                slack_id: process.env.SERVER_DEVELOPMENT_USER_SLACK_ID
            });
            //------------- Roles --------------
            const rolesCreated = await Role.bulkCreate(roles);
            //---------- Permissions -----------
            const permissionsCreated = await Permission.bulkCreate(permissions);
            // Add roles to a user:
            await userCreated.addRole(rolesCreated[0].id); // owner
            await userCreated.addRole(rolesCreated[1].id); // admin
            await userCreated.addRole(rolesCreated[2].id); // techlead
            // Role: owner add permissions:
            await rolesCreated[0].addPermission(permissionsCreated[0].id);
            await rolesCreated[0].addPermission(permissionsCreated[1].id);
            await rolesCreated[0].addPermission(permissionsCreated[2].id);
            await rolesCreated[0].addPermission(permissionsCreated[3].id);
            await rolesCreated[0].addPermission(permissionsCreated[4].id);
            await rolesCreated[0].addPermission(permissionsCreated[5].id);
            await rolesCreated[0].addPermission(permissionsCreated[6].id);
            await rolesCreated[0].addPermission(permissionsCreated[7].id);
            await rolesCreated[0].addPermission(permissionsCreated[8].id);
            await rolesCreated[0].addPermission(permissionsCreated[9].id);
            await rolesCreated[0].addPermission(permissionsCreated[10].id);
            await rolesCreated[0].addPermission(permissionsCreated[11].id);
            // Role: admin add permissions:
            await rolesCreated[1].addPermission(permissionsCreated[4].id);
            await rolesCreated[1].addPermission(permissionsCreated[5].id);
            await rolesCreated[1].addPermission(permissionsCreated[6].id);
            await rolesCreated[1].addPermission(permissionsCreated[7].id);
            await rolesCreated[1].addPermission(permissionsCreated[8].id);
            await rolesCreated[1].addPermission(permissionsCreated[9].id);
            await rolesCreated[1].addPermission(permissionsCreated[10].id);
            await rolesCreated[1].addPermission(permissionsCreated[11].id);
            // Role: techlead add permissions:
            await rolesCreated[2].addPermission(permissionsCreated[8].id);
            //-------------- Courses -------------
            const coursesCreated = await Course.bulkCreate(courses);
            //------------ Course DEV-------------
            if (process.env.SERVER_DEVELOPMENT_COURSE_NAME) {
                const courseCreated = await Course.create({
                    name: process.env.SERVER_DEVELOPMENT_COURSE_NAME,
                    slack_id: process.env.SERVER_DEVELOPMENT_COURSE_SLACK_ID
                        ? process.env.SERVER_DEVELOPMENT_COURSE_SLACK_ID
                        : null,
                    slack_name:
                        process.env.SERVER_DEVELOPMENT_COURSE_SLACK_ID &&
                        process.env.SERVER_DEVELOPMENT_COURSE_NAME_SLACK
                            ? process.env.SERVER_DEVELOPMENT_COURSE_NAME_SLACK
                            : null,
                    google_calendar_id: process.env.SERVER_DEVELOPMENT_COURSE_CALENDAR_ID
                        ? process.env.SERVER_DEVELOPMENT_COURSE_CALENDAR_ID
                        : null,
                    google_calendar_name:
                        process.env.SERVER_DEVELOPMENT_COURSE_CALENDAR_ID &&
                        process.env.SERVER_DEVELOPMENT_COURSE_CALENDAR_NAME
                            ? process.env.SERVER_DEVELOPMENT_COURSE_CALENDAR_NAME
                            : null,
                    title: 'Full Stack Bootcamp',
                    title_extra: '(React&Node)',
                    type: 'Especialización',
                    duration: '2 meses',
                    status: 'open',
                    level: 2,
                    technologies: 'JReact, Redux, Node, SQL, Docker & Kubernetes.',
                    price: 'Solo pagas si obtienes un empleo.',
                    minimum: 60,
                    extra_alert: false
                });
                // Add Course to a user:
                await userCreated.addCourse(courseCreated);
            }
            console.log('development data uploaded successfully');
        }
    } catch (error) {
        console.log('error loading development data');
        console.log('error: ', error);
    }
};

module.exports = preload;
