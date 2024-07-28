const request = require('supertest');
const config = require('../Config/config');

module.exports = {
    userPostRequest: function (testUser) {
        return request(config.host)
            .post(config.usersAPI)
            .auth(process.env.API_BEARER_TOKEN, { type: "bearer" })
            .send(testUser);
    },
    userUnauthorizedPostRequest: function (testUser) {
        return request(config.host)
            .post(config.usersAPI)
            .send(testUser);
    },
    userGetRequest: function (path = '') {
        return request(config.host)
            .get(config.usersAPI + path)
            .auth(process.env.API_BEARER_TOKEN, { type: "bearer" });
    },
    userDeleteRequest: function (path = '') {
        return request(config.host)
            .get(config.usersAPI + path)
            .auth(process.env.API_BEARER_TOKEN, { type: "bearer" });
    },
    userUnauthorizedDeleteRequest: function (path = '') {
        return request(config.host)
            .get(config.usersAPI + path);
    },
    userPutRequest: function (path = '', testUser) {
        return request(config.host)
            .put(config.usersAPI + path)
            .auth(process.env.API_BEARER_TOKEN, { type: "bearer" })
            .send(testUser);
    },
    userUnauthorizedPutRequest: function (path = '', testUser) {
        return request(config.host)
            .put(config.usersAPI + path)
            .send(testUser);
    },
    userPatchRequest: function (path = '', reqBody) {
        return request(config.host)
            .patch(config.usersAPI + path)
            .auth(process.env.API_BEARER_TOKEN, { type: "bearer" })
            send(reqBody);
    },

};