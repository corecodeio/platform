const { Event } = require('./../../utils/db');
const { serverConfig } = require('./../../config/index');
const googleCalendar = require('./../../utils/calendar/googleCalendar');
const scheduleDailyMessage = require('./../../utils/schedule/scheduleDailyMessage');

const VALID_EVENT_TYPES = ['daily message', 'celebration', 'meet'];

const getEventType = ({ type, daily_message }) => {
    if (type) {
        return type;
    }
    return daily_message ? 'daily message' : 'celebration';
};

const getDate = (date) => {
    const parsedDate = new Date(date);
    return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
};

const createCalendarEvent = async ({ name, startDate, endDate, calendar_description, eventType }) => {
    const requestBody = {
        summary: name,
        description: calendar_description,
        start: {
            dateTime: startDate.toISOString()
        },
        end: {
            dateTime: endDate.toISOString()
        }
    };

    const calendarRequest = {
        calendarId: serverConfig.calendar_celebration_id,
        requestBody
    };

    if (eventType === 'meet') {
        calendarRequest.conferenceDataVersion = 1;
        requestBody.conferenceData = {
            createRequest: {
                requestId: `meet-${Date.now()}`
            }
        };
    }

    return googleCalendar.events.insert(calendarRequest);
};

module.exports = async (req, res) => {
    try {
        const { name, start, end, calendar_description, daily_message, slack_message } = req.body;
        const eventType = getEventType(req.body);
        const startDate = getDate(start);
        const endDate = getDate(end);

        if (!name || !start || !end || !calendar_description) {
            return res.status(200).json({ successful: false, message: 'missing data' });
        }

        if (!VALID_EVENT_TYPES.includes(eventType)) {
            return res.status(200).json({ successful: false, message: 'invalid event type' });
        }

        if (!startDate || !endDate || endDate <= startDate) {
            return res.status(200).json({ successful: false, message: 'invalid event dates' });
        }

        if (!serverConfig.calendar_celebration_id) {
            return res.status(200).json({ successful: false, message: 'missing calendar configuration' });
        }

        if (eventType === 'daily message' && !daily_message) {
            return res.status(200).json({ successful: false, message: 'missing daily message' });
        }

        const responseCalendarEvent = await createCalendarEvent({
            name,
            startDate,
            endDate,
            calendar_description,
            eventType
        });

        const calendarEvent = responseCalendarEvent.data;
        const eventRecord = await Event.create({
            name,
            calendar_id: serverConfig.calendar_celebration_id,
            calendar_event_id: calendarEvent.id,
            start: startDate,
            end: endDate,
            type: eventType,
            calendar_description,
            daily_message,
            slack_message,
            link_meet: eventType === 'meet' ? calendarEvent.hangoutLink : req.body.link_meet
        });

        if (eventType === 'daily message') {
            scheduleDailyMessage(eventRecord);
        }

        return res.status(200).json({
            successful: true,
            message: 'event created successfully',
            event: eventRecord
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ successful: false, message: error.message || 'error server' });
    }
};
