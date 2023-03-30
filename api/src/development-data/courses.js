const courses = [
    {
        id: 'fcba7807-2176-486c-89c3-909a42a88a4f',
        name: process.env.SERVER_DEVELOPMENT_COURSE_NAME
            ? process.env.SERVER_DEVELOPMENT_COURSE_NAME
            : 'Fullstack 25.5',
        slack_id: process.env.SERVER_DEVELOPMENT_COURSE_SLACK_ID
            ? process.env.SERVER_DEVELOPMENT_COURSE_SLACK_ID
            : null,
        slack_name: process.env.SERVER_DEVELOPMENT_COURSE_NAME_SLACK
            ? process.env.SERVER_DEVELOPMENT_COURSE_NAME_SLACK
            : null,
        google_calendar_id: process.env.SERVER_DEVELOPMENT_COURSE_CALENDAR_ID
            ? process.env.SERVER_DEVELOPMENT_COURSE_CALENDAR_ID
            : null,
        google_calendar_name: process.env.SERVER_DEVELOPMENT_COURSE_CALENDAR_NAME
            ? process.env.SERVER_DEVELOPMENT_COURSE_CALENDAR_NAME
            : null,
        zoom_url: 'https://zoom.us/testing',
        zoom_code: '123456',
        status: 'pending'
    }
];

module.exports = courses;
