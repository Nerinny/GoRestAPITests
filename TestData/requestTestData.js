const { faker }  = require('@faker-js/faker')

module.exports = {
    testUser: {
        "name": faker.person.fullName(),
        "email": faker.internet.email(),
        "gender": faker.person.sex(),
        "status": "active"
    },
};