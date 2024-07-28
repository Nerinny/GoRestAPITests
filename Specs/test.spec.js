const { faker } = require('@faker-js/faker')

const requestTestData = require('../TestData/requestTestData');
const responseExpectedData = require('../TestData/responseExpectedData');
const requestHelper = require('../Helpers/requestHelpers');

afterEach(() => {
    faker.seed();
})

describe('Verify creating new user', () => {
    it('Verify that POST request for correct user has correct response', async () => {
        var testUser = requestTestData.testUser(faker);
        const res = await requestHelper.userPostRequest(testUser)
            .expect(201);
        expect(res.body.id).toBeGreaterThan(0);
        expect(res.body.name).toBe(testUser.name);
        expect(res.body.email).toBe(testUser.email);
        expect(res.body.gender).toBe(testUser.gender);
        expect(res.body.status).toBe(testUser.status);
    })

    it.each(['email', 'name', 'gender','status'])('Verify that POST request for user with missing %p data has correct response', async (deletedEntry) => {
        var missingDataRequest = Object.assign({}, requestTestData.testUser(faker));
        delete missingDataRequest[deletedEntry];
        const res = await requestHelper.userPostRequest(missingDataRequest)
            .expect(422);
        expect(res.body).toEqual(responseExpectedData.incompleteUserResponses[deletedEntry]);
    })

    it('Verify that POST request for duplicate user data has correct response', async () => {
        var testUser = requestTestData.testUser(faker);
        await requestHelper.userPostRequest(testUser)
            .expect(201);

        const res = await requestHelper.userPostRequest(testUser)
            .expect(422);
        expect(res.body).toEqual(responseExpectedData.duplicateUserRespose);
    })

    it('Verify unauthorized user POST request', async () => {
        var testUser = requestTestData.testUser(faker);

        const res = await requestHelper.userUnauthorizedPostRequest(testUser)
            .expect(401);
        expect(res.body).toEqual(responseExpectedData.unauthorizedUserResponse);
    })
});