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

// Testing server:

// status 200
describe("server.js", () => {
    describe("GET/", ()=> {
    it('should return 200 OK', async() => {
        const res = await request(server).get("/");
        expect(res.status).toBe(200);
    });

// application/json
    it('should return JSON', () => {
        return request(server).get("/") 
        .then(res => {
            expect(res.type).toMatch(/json/)
        })
     });
 
// api property in the body
     it('should respond with { "api: Up and running" }', () => {
        return request(server)
        .get("/") 
        .then(res => {
             expect(res.body.api).toEqual("Up and running")
        })
    });

    //environment
    describe("server", ()=> {
        describe("environment", () => {
            it("should use the testing environment", () => {
                expect(process.env.DB_ENV).toBe("testing")
            })
        })
    })

  })
})


