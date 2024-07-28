const { faker } = require('@faker-js/faker')

const requestTestData = require('../TestData/requestTestData');
const responseExpectedData = require('../TestData/responseExpectedData');
const requestHelper = require('../Helpers/requestHelpers');

afterEach(() => {
    faker.seed();
})

describe('Verify deleting users', () => {
    it('Verify that DELETE request for specific user has correct response', async () => {
        var testUser = requestTestData.testUser(faker);
        const res_create = await requestHelper.userPostRequest(testUser)
            .expect(201);

        const res = await requestHelper.userDeleteRequest('/' + res_create.body.id)
            .expect(200);

        expect(res.body.name).toBe(testUser.name);
        expect(res.body.email).toBe(testUser.email);
        expect(res.body.gender).toBe(testUser.gender);
        expect(res.body.status).toBe(testUser.status);
    })

    it('Verify that DELETE request for non existent user has correct response', async () => {
        const res = await requestHelper.userDeleteRequest('/0')
            .expect(404);

        expect(res.body).toEqual(responseExpectedData.notFoundResourceResponse);
    })

    it('Verify unauthorized user DELETE request', async () => {
        var testUser = requestTestData.testUser(faker);
        const res_create = await requestHelper.userPostRequest(testUser)
            .expect(201);
        const res = await requestHelper.userUnauthorizedDeleteRequest('/' + res_create.body.id)
            .expect(404);
        expect(res.body).toEqual(responseExpectedData.notFoundResourceResponse);
    })
});