module.exports = {
    testUser: function (faker) {
        var user =
        {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            gender: faker.person.sex(),
            status: "active"
        }
        return user;
    }
};