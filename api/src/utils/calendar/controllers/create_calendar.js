const googleCalendar = require('./../googleCalendar');

module.exports = async ({ calendar_name, calendar_description }) => {
    try {
        const responseCalendar = await googleCalendar.calendars.insert({
            requestBody: {
                summary: calendar_name,
                timezone: 'America/Guatemala',
                description: calendar_description
            }
        });/*
        await googleCalendar.calendars.update({
            calendarId: responseCalendar.data.id,
            requestBody: {
                timeZone: 'America/Guatemala',
                summary: calendar_name,
                description: calendar_description
            }
        });*/
        return { successful: true, id: responseCalendar.data.id };
    } catch (error) {
        return { successful: false, error: error.response.data };
    }
};
