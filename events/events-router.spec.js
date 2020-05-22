const Events = require('./events-model.js');
const db = require('../data/dbConfig.js');

const server = require('../api/server.js');

const request = require('supertest');

// mock the authentication middleware so we can test what's actually in the endpoint
const authenticate = require('../auth/authenticate-middleware');
jest.mock('../auth/authenticate-middleware');

//events end point test
describe('GET', () => {
    describe('get all events', () => {
        it('return a 400 status when proper token is not provided', async () => {
            authenticate.mockImplementation((req, res, next) => next());

            const res = await request(server).get('/api/events');

            // expect it to be an error because we didn't pass a token into the request
            expect(res.status).toBe(400);
        });

        it('JSON response', async () => {
            authenticate.mockImplementation((req, res, next) => next());
            const res = await request(server).get('/api/events');

            // expect it to be an error because we didn't pass a token into the request
            expect(res.type).toMatch('application/json');
        });
    });
});

// events end point test one event
describe('GET', () => {
    describe('get event by id', () => {
        it('return a 500 status when proper token is not provided', async () => {
            authenticate.mockImplementation((req, res, next) => next());
            const res = await request(server).get('/api/events/findbyid/1');

            // expect it to be an error because we didn't pass a token into the request
            expect(res.status).toBe(500);
        });

        it('JSON response', async () => {
            authenticate.mockImplementation((req, res, next) => next());
            const res = await request(server).get('/api/events/findbyid/1');

            // expect it to be an error because we didn't pass a token into the request
            expect(res.type).toMatch('application/json');
        });
    });
});

// // events end point test add event
describe('POST', () => {
    describe('create new event', () => {
        it('return a 500 status when proper token is not provided', async () => {
            authenticate.mockImplementation((req, res, next) => next());
            const res = await request(server).post('/api/events/insertevents');

            // expect it to be an error because we didn't pass a token into the request
            expect(res.status).toBe(500);
        });

        it('JSON response', async () => {
            authenticate.mockImplementation((req, res, next) => next());
            const res = await request(server).post('/api/events/insertevents');

            // expect it to be an error because we didn't pass a token into the request
            expect(res.type).toMatch('application/json');
        });
    });
});

// // events end point test update event
describe('PUT', () => {
    describe('update event', () => {
        it('return a 500 OK', async () => {
            authenticate.mockImplementation((req, res, next) => next());
            const res = await request(server).put('/api/events/updateevent/1');

            // expect it to be an error because we didn't pass a token into the request
            expect(res.status).toBe(500);
        });

        it('JSON response', async () => {
            authenticate.mockImplementation((req, res, next) => next());
            const res = await request(server).put('/api/events/updateevent/1');

            // expect it to be an error because we didn't pass a token into the request
            expect(res.type).toMatch('application/json');
        });
    });
});

// // events end point test delete event
describe('DELETE', () => {
    describe('delete event', () => {
        it('return a 404 OK', async () => {
            authenticate.mockImplementation((req, res, next) => next());
            const res = await request(server).delete(
                '/api/events/deleteevent/1'
            );

            // expect it to be an error because we didn't pass a token into the request
            expect(res.status).toBe(500);
        });

        it('JSON response', async () => {
            authenticate.mockImplementation((req, res, next) => next());
            const res = await request(server).delete(
                '/api/events/deleteevent/1'
            );

            // expect it to be an error because we didn't pass a token into the request
            expect(res.type).toMatch('application/json');
        });
    });
});
