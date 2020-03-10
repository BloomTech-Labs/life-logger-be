const server = require("./api/server.js");

const request = require("supertest");

const db = require("./data/dbConfig");



describe('POST', ()=> {
    describe('GET', ()=>{
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

describe('POST', ()=> {
    describe('GET', ()=>{
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