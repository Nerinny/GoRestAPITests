const request = require('supertest');


const config = require('../Config/config'); // import test config
const requestTestData = require('../TestData/requestTestData'); // import request data

describe('Verify creating new user', () => {
    it('Verify that user POST API has correct response', async () => {
        const res = await request(config.host)
            .post(config.usersAPI)
            .auth(process.env.API_BEARER_TOKEN, { type: "bearer"})
            .send(requestTestData.testUser)
            .expect(201);
        expect(res.body.id).toBeGreaterThan(0)
        expect(res.body.name).toBe(requestTestData.testUser.name)
        expect(res.body.email).toBe(requestTestData.testUser.email)
        expect(res.body.gender).toBe(requestTestData.testUser.gender)
        expect(res.body.status).toBe(requestTestData.testUser.status)
    })
});