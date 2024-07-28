const request = require('supertest');
const config = require('../Config/config');

module.exports = {
    userPostRequest: function (testUser) {
        return  request(config.host)
            .post(config.usersAPI)
            .auth(process.env.API_BEARER_TOKEN, { type: "bearer" })
            .send(testUser);
    },
    userUnauthorizedPostRequest: function (testUser) {
        return request(config.host)
            .post(config.usersAPI)
            .send(testUser);
    }
};