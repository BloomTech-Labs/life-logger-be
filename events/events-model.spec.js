const Events = require('./events-model.js');
const db = require('../data/dbConfig.js');

// describe('events-model', () => {
//     describe('find', () => {
//         it('should find all events in the db', async()=> {
//             const events = await db('events')
//             expect(Events).toHaveLength(3) //find out how many users are in the seed data
//         })
//     })
// })


const server = require("../api/server.js");

const request = require("supertest");

//events end point test
describe('GET', ()=> {
    describe('GET', ()=>{
        it('return a 500 OK', ()=>{
            return request(server)
            .get('/api/events')
            .then(res => {
                expect(res.status).toBe(500)
            })
        })
        it('JSON response', ()=>{
            return request(server)
            .get('/api/events')
            .then(res => {
                expect(res.type).toMatch('application/json')
            })  
         })  
    })
})

// events end point test one event
describe('GET', ()=> {
    describe('GET', ()=>{
        it('return a 400 OK', ()=>{
            return request(server)
            .get('/api/events/findbyid/1')
            .then(res => {
                expect(res.status).toBe(400)
            })
        })
        it('JSON response', ()=>{
            return request(server)
            .get('/api/events/1')
            .then(res => {
                expect(res.type).toMatch('application/json')
            })  
         })  
    })
})
//*************  NEEDS TO RETURN 404 **************
// events end point test add event
describe('POST', ()=> {
    describe('POST', ()=>{
        it('return a 500 OK', ()=>{
            return request(server)
            .post('/api/events')
            .then(res => {
                expect(res.status).toBe(500)
            })
        })
        it('JSON response', ()=>{
            return request(server)
            .post('/api/events')
            .then(res => {
                expect(res.type).toMatch('application/json')
            })  
         })  
    })
})

//*************  NEEDS TO RETURN 404 **************
// events end point test update event
describe('PUT', ()=> {
    describe('PUT', ()=>{
        it('return a 500 OK', ()=>{
            return request(server)
            .put('/api/events/updateevent/1')
            .then(res => {
                expect(res.status).toBe(500)
            })
        })
        it('JSON response', ()=>{
            return request(server)
            .put('/api/events/updateevent/1')
            .then(res => {
                expect(res.type).toMatch('application/json')
            })  
         })  
    })
})

//*************  NEEDS TO RETURN 404 **************
// events end point test delete event
describe('DELETE', ()=> {
    describe('DELETE', ()=>{
        it('return a 500 OK', ()=>{
            return request(server)
            .put('/api/events/1')
            .then(res => {
                expect(res.status).toBe(500)
            })
        })
        it('JSON response', ()=>{
            return request(server)
            .delete('/api/events/deleteevent/1')
            .then(res => {
                expect(res.type).toMatch('application/json')
            })  
         })  
    })

})




