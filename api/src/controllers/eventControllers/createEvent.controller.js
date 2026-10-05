const schedule = require('node-schedule');
const { Event } = require('./../../utils/db');
const googleCalendar = require('./../../utils/calendar/googleCalendar');
const appSlack = require('./../../utils/slack/appSlack');
const { serverConfig } = require('./../../config');

const EVENT_TYPES = ['daily message', 'celebration', 'meet'];

const sendDailyMessage = async (eventId, dailyMessage) => {
    const response = await appSlack.client.chat.postMessage({
        channel: serverConfig.channel_slack_celebration,
        text: dailyMessage
    });

    if (response && response.ts) {
        const eventRecord = await Event.findByPk(eventId);
        if (eventRecord) {
            eventRecord.ts_daily_message = response.ts;
            eventRecord.sent = true;
            await eventRecord.save();
        }
    }
};

const scheduleDailyMessage = (eventRecord) => {
    if (!eventRecord.daily_message) {
        return;
    }

    schedule.scheduleJob(new Date(eventRecord.start), () =>
        sendDailyMessage(eventRecord.id, eventRecord.daily_message)
    );
};

const buildCalendarEvent = ({ name, start, end, calendar_description, type, slack_message }) => {
    const requestBody = {
        summary: name,
        description: calendar_description || slack_message || '',
        start: { dateTime: start },
        end: { dateTime: end }
    };

    if (type === 'meet') {
        requestBody.conferenceData = {
            createRequest: {
                requestId: `meet-${Date.now()}`
            }
        };
    }

    return requestBody;
};

module.exports = async (req, res) => {
    const { name, start, end, type, calendar_description, daily_message, slack_message } = req.body;

    if (!name || !start || !end || !type) {
        return res.status(200).json({
            successful: false,
            message: 'missing event data'
        });
    }

    if (!EVENT_TYPES.includes(type)) {
        return res.status(200).json({
            successful: false,
            message: 'invalid event type'
        });
    }

    if (type === 'daily message' && !daily_message) {
        return res.status(200).json({
            successful: false,
            message: 'daily message is required'
        });
    }

    try {
        const calendarResponse = await googleCalendar.events.insert({
            calendarId: serverConfig.calendar_celebration_id,
            conferenceDataVersion: type === 'meet' ? 1 : 0,
            requestBody: buildCalendarEvent({
                name,
                start,
                end,
                calendar_description,
                type,
                slack_message
            })
        });

        const googleEvent = calendarResponse.data;
        const eventRecord = await Event.create({
            name,
            start,
            end,
            type,
            calendar_description,
            daily_message,
            slack_message,
            calendar_id: serverConfig.calendar_celebration_id,
            calendar_event_id: googleEvent.id,
            link_meet: type === 'meet' ? googleEvent.hangoutLink : null
        });

        if (type === 'daily message') {
            scheduleDailyMessage(eventRecord);
        }

        return res.status(200).json({
            successful: true,
            message: 'event created successfully',
            event: eventRecord
        });
    } catch (error) {
        console.error(error);
        return res.status(200).json({
            successful: false,
            message: 'error server'
        });
    }
};
