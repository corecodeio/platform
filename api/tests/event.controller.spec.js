jest.mock('../src/utils/db', () => ({
    Event: {
        create: jest.fn(),
        findByPk: jest.fn()
    }
}));

jest.mock('../src/utils/calendar/googleCalendar', () => ({
    events: {
        insert: jest.fn()
    }
}));

jest.mock('../src/utils/slack/appSlack', () => ({
    client: {
        chat: {
            postMessage: jest.fn()
        }
    }
}));

jest.mock('node-schedule', () => ({
    scheduleJob: jest.fn()
}));

jest.mock('../src/config', () => ({
    serverConfig: {
        calendar_celebration_id: 'calendar-123',
        channel_slack_celebration: 'channel-123'
    }
}));

const createEvent = require('../src/controllers/eventControllers/createEvent.controller');
const { Event } = require('../src/utils/db');
const googleCalendar = require('../src/utils/calendar/googleCalendar');
const appSlack = require('../src/utils/slack/appSlack');
const schedule = require('node-schedule');

const response = () => {
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
                id: 'calendar-event-123',
                hangoutLink: 'https://meet.google.com/abc-defg-hij'
            }
        });
    });

    test('creates a celebration event in the configured calendar', async () => {
        const eventRecord = { id: 'event-1', type: 'celebration' };
        Event.create.mockResolvedValue(eventRecord);

        const req = {
            body: {
                name: 'Graduation',
                type: 'celebration',
                start: '2026-06-20T10:00:00.000Z',
                end: '2026-06-20T11:00:00.000Z',
                calendar_description: 'Celebrate the cohort',
                slack_message: 'Congratulations'
            }
        };
        const res = response();

        await createEvent(req, res);

        expect(googleCalendar.events.insert).toHaveBeenCalledWith(
            expect.objectContaining({
                calendarId: 'calendar-123',
                conferenceDataVersion: 0,
                requestBody: expect.objectContaining({
                    summary: 'Graduation',
                    description: 'Celebrate the cohort'
                })
            })
        );
        expect(Event.create).toHaveBeenCalledWith(
            expect.objectContaining({
                calendar_id: 'calendar-123',
                calendar_event_id: 'calendar-event-123',
                link_meet: null
            })
        );
        expect(res.json).toHaveBeenCalledWith({
            successful: true,
            message: 'event created successfully',
            event: eventRecord
        });
    });

    test('stores Google Meet link for meet events', async () => {
        Event.create.mockResolvedValue({ id: 'event-2', type: 'meet' });

        await createEvent(
            {
                body: {
                    name: 'Mentor call',
                    type: 'meet',
                    start: '2026-06-20T10:00:00.000Z',
                    end: '2026-06-20T11:00:00.000Z'
                }
            },
            response()
        );

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
                link_meet: 'https://meet.google.com/abc-defg-hij'
            })
        );
    });

    test('schedules daily Slack message and saves ts when job runs', async () => {
        const eventRecord = {
            id: 'event-3',
            type: 'daily message',
            start: '2026-06-20T10:00:00.000Z',
            daily_message: 'Daily reminder'
        };
        const savedRecord = { save: jest.fn() };
        Event.create.mockResolvedValue(eventRecord);
        Event.findByPk.mockResolvedValue(savedRecord);
        appSlack.client.chat.postMessage.mockResolvedValue({ ts: '171000.42' });
        let scheduledJob;
        schedule.scheduleJob.mockImplementation((date, job) => {
            scheduledJob = job;
        });

        await createEvent(
            {
                body: {
                    name: 'Daily standup',
                    type: 'daily message',
                    start: '2026-06-20T10:00:00.000Z',
                    end: '2026-06-20T10:15:00.000Z',
                    daily_message: 'Daily reminder'
                }
            },
            response()
        );

        expect(schedule.scheduleJob).toHaveBeenCalledWith(expect.any(Date), expect.any(Function));
        await scheduledJob();
        expect(appSlack.client.chat.postMessage).toHaveBeenCalledWith({
            channel: 'channel-123',
            text: 'Daily reminder'
        });
        expect(savedRecord.ts_daily_message).toBe('171000.42');
        expect(savedRecord.sent).toBe(true);
        expect(savedRecord.save).toHaveBeenCalled();
    });

    test('rejects unsupported event types', async () => {
        const res = response();

        await createEvent(
            {
                body: {
                    name: 'Other event',
                    type: 'workshop',
                    start: '2026-06-20T10:00:00.000Z',
                    end: '2026-06-20T11:00:00.000Z'
                }
            },
            res
        );

        expect(Event.create).not.toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith({
            successful: false,
            message: 'invalid event type'
        });
    });
});
