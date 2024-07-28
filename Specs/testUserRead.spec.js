const { faker } = require('@faker-js/faker')

const requestTestData = require('../TestData/requestTestData');
const responseExpectedData = require('../TestData/responseExpectedData');
const requestHelper = require('../Helpers/requestHelpers');

afterEach(() => {
    faker.seed();
})

describe('Verify reading users', () => {
    it('Verify that GET request for all users has correct response', async () => {
        const res = await requestHelper.userGetRequest()
            .expect(200);
        expect(res.body).toBeDefined();
    })

    it('Verify that GET request for specific created user has correct response', async () => {
        var testUser = requestTestData.testUser(faker);
        const res_create = await requestHelper.userPostRequest(testUser)
            .expect(201);

        const res = await requestHelper.userGetRequest('/' + res_create.body.id)
            .expect(200);

        expect(res.body.name).toBe(testUser.name);
        expect(res.body.email).toBe(testUser.email);
        expect(res.body.gender).toBe(testUser.gender);
        expect(res.body.status).toBe(testUser.status);
    })

    it('Verify that GET request for non existent user has correct response', async () => {
        const res = await requestHelper.userGetRequest('/0')
            .expect(404);

        expect(res.body).toEqual(responseExpectedData.notFoundResourceResponse);
    })

    it.each([5, 10, 25, 100])('Verify that GET request for %p paged result of users has correct response', async (pageSize) => {
        const res = await requestHelper.userGetRequest('/?per_page=' + pageSize)
            .expect(200);
        expect(res.body.length).toEqual(pageSize);
    })

    it('Verify that GET request for filtered by email specific user has correct response', async () => {
        var testUser = requestTestData.testUser(faker);
        const res_create = await requestHelper.userPostRequest(testUser)
            .expect(201);

        const res = await requestHelper.userGetRequest('?email=' + res_create.body.email)
            .expect(200);

        expect(res.body.length).toBe(1);
        expect(res.body[0].name).toBe(testUser.name);
        expect(res.body[0].email).toBe(testUser.email);
        expect(res.body[0].gender).toBe(testUser.gender);
        expect(res.body[0].status).toBe(testUser.status);
    })
});