const server = require("./api/server.js");

const request = require("supertest");

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
            .post('/api/auth/register')
            .then(res => {
                expect(res.type).toMatch('text/html')
            })  
         })  
    })
})

<<<<<<< HEAD
//----------------------------------------------------

=======
>>>>>>> 7195c588e860c56c99e89f47c9a915cd9ed7dc48
