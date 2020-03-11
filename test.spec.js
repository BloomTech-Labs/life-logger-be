const server = require("./api/server.js");

const request = require("supertest");

//const db = require("./data/dbConfig");


// login end point test
describe('POST', ()=> {
    describe('POST', ()=>{
        it('return a 404 OK', ()=>{
            return request(server)
            .get('/api/auth/login')
            .then(res => {
                expect(res.status).toBe(404)
            })
        })
        it('JSON response', ()=>{
            return request(server)
            .get('/api/auth/login')
            .then(res => {
                expect(res.type).toMatch('text/html')
            })  
         })  
    })
})

// register end point test
describe('POST', ()=> {
    describe('POST', ()=>{
        it('return a 404 OK', ()=>{
            return request(server)
            .get('/api/auth/register')
            .then(res => {
                expect(res.status).toBe(404)
            })
        })
        it('JSON response', ()=>{
            return request(server)
            .get('/api/auth/register')
            .then(res => {
                expect(res.type).toMatch('text/html')
            })  
         })  
    })
})

/* events end point test
describe('GET', ()=> {
    describe('GET', ()=>{
        it('return a 404 OK', ()=>{
            return request(server)
            .get('/api/events')
            .then(res => {
                expect(res.status).toBe(404)
            })
        })
        it('JSON response', ()=>{
            return request(server)
            .get('/api/events')
            .then(res => {
                expect(res.type).toMatch('text/html')
            })  
         })  
    })
})

// events end point test one event
describe('GET', ()=> {
    describe('GET', ()=>{
        it('return a 404 OK', ()=>{
            return request(server)
            .get('/api/events/1')
            .then(res => {
                expect(res.status).toBe(404)
            })
        })
        it('JSON response', ()=>{
            return request(server)
            .get('/api/events/1')
            .then(res => {
                expect(res.type).toMatch('text/html')
            })  
         })  
    })
})
*/