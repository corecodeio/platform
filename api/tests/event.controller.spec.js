jest.mock('./../src/utils/db', () => ({
    Event: {
        create: jest.fn()
    }
}));

jest.mock('./../src/config/index', () => ({
    serverConfig: {
        calendar_celebration_id: 'calendar-id',
        channel_slack_celebration: 'slack-channel-id'
    }
}));

jest.mock('./../src/utils/calendar/googleCalendar', () => ({
    events: {
        insert: jest.fn()
    }
}));

jest.mock('./../src/utils/schedule/scheduleDailyMessage', () => jest.fn());

const { Event } = require('./../src/utils/db');
const googleCalendar = require('./../src/utils/calendar/googleCalendar');
const scheduleDailyMessage = require('./../src/utils/schedule/scheduleDailyMessage');
const createEvent = require('./../src/controllers/eventControllers/createEvent.controller');

const createResponse = () => {
    const res = {};
    res.status = jest.fn(() => res);
    res.json = jest.fn(() => res);
    return res;
};

describe('createEvent controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        googleCalendar.events.insert.mockResolvedValue({
            data: {
                id: 'google-event-id',
                hangoutLink: 'https://meet.google.com/abc-defg-hij'
            }
        });
        Event.create.mockImplementation(async (event) => ({
            ...event,
            id: 'event-id',
            update: jest.fn()
        }));
    });

    test('creates a daily message event and schedules the Slack message', async () => {
        const req = {
            body: {
                name: 'Fullstack',
                start: '2026-05-09T23:19:34.000Z',
                end: '2026-05-09T23:29:34.000Z',
                calendar_description: 'calendar text',
                daily_message: 'daily text',
                slack_message: 'slack text'
            }
        };
        const res = createResponse();

        await createEvent(req, res);

        expect(googleCalendar.events.insert).toHaveBeenCalledWith(
            expect.objectContaining({
                calendarId: 'calendar-id',
                requestBody: expect.objectContaining({
                    summary: 'Fullstack',
                    description: 'calendar text'
                })
            })
        );
        expect(Event.create).toHaveBeenCalledWith(
            expect.objectContaining({
                calendar_event_id: 'google-event-id',
                type: 'daily message',
                daily_message: 'daily text',
                slack_message: 'slack text'
            })
        );
        expect(scheduleDailyMessage).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ successful: true }));
    });

    test('asks Google Calendar to create a Meet link for meet events', async () => {
        const req = {
            body: {
                name: 'Meet',
                type: 'meet',
                start: '2026-05-09T23:19:34.000Z',
                end: '2026-05-09T23:29:34.000Z',
                calendar_description: 'calendar text'
            }
        };
        const res = createResponse();

        await createEvent(req, res);

        expect(googleCalendar.events.insert).toHaveBeenCalledWith(
            expect.objectContaining({
                conferenceDataVersion: 1,
                requestBody: expect.objectContaining({
                    conferenceData: expect.any(Object)
                })
            })
        );
        expect(Event.create).toHaveBeenCalledWith(
            expect.objectContaining({
                type: 'meet',
                link_meet: 'https://meet.google.com/abc-defg-hij'
            })
        );
        expect(scheduleDailyMessage).not.toHaveBeenCalled();
    });
});
