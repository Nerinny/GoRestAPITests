const { faker } = require('@faker-js/faker')

const requestTestData = require('../TestData/requestTestData');
const responseExpectedData = require('../TestData/responseExpectedData');
const requestHelper = require('../Helpers/requestHelpers');

afterEach(() => {
    faker.seed();
})

describe('Verify updating user', () => {
    it('Verify that PUT request with new data for correct user has correct response', async () => {
        var testUser = requestTestData.testUser(faker);
        const res_create = await requestHelper.userPostRequest(testUser)
            .expect(201);
        var modifiedUser = requestTestData.testUser(faker);
        const res_update = await requestHelper.userPutRequest('/' + res_create.body.id, modifiedUser)
            .expect(200);
        expect(res_update.body.id).toBe(res_create.body.id);
        expect(res_update.body.name).toBe(modifiedUser.name);
        expect(res_update.body.email).toBe(modifiedUser.email);
        expect(res_update.body.gender).toBe(modifiedUser.gender);
        expect(res_update.body.status).toBe(modifiedUser.status);
    })

    it.each(['name', 'email'])('Verify that PATCH request with new data for %p for correct user has correct response', async (updatedEntry) => {
        var testUser = requestTestData.testUser(faker);
        const res_create = await requestHelper.userPostRequest(testUser)
            .expect(201);
        var modifiedUser = requestTestData.testUser(faker);
        const res_update = await requestHelper.userPutRequest('/' + res_create.body.id, { [updatedEntry]: modifiedUser[updatedEntry] })
            .expect(200);
        expect(res_update.body).not.toEqual(res_create.body);
    })

    it('Verify that PUT request with new invalid data for correct user has correct response', async () => {
        var testUser = requestTestData.testUser(faker);
        const res_create = await requestHelper.userPostRequest(testUser)
            .expect(201);
        const res_update = await requestHelper.userPutRequest('/' + res_create.body.id, { gender: 'invalidData' })
            .expect(422);
        expect(res_update.body).toEqual(responseExpectedData.incompleteUserResponses.gender);

    })

    it('Verify that PATCH request with new invalid user has correct response', async () => {
        const res_update = await requestHelper.userPatchRequest('/0', { gender: 'invalidData' })
            .expect(404);
        expect(res_update.body).toEqual(responseExpectedData.notFoundResourceResponse);
    })

    it('Verify that unauthorized PUT request has correct response', async () => {
        var testUser = requestTestData.testUser(faker);
        const res_create = await requestHelper.userPostRequest(testUser)
            .expect(201);
        var modifiedUser = requestTestData.testUser(faker);
        const res_update = await requestHelper.userUnauthorizedPutRequest('/' + res_create.body.id, modifiedUser)
            .expect(404);
        expect(res_update.body).toEqual(responseExpectedData.notFoundResourceResponse);
    })

});