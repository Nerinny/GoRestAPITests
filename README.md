# Go REST user CRUD operations API tests
API tests of CRUD operations done with Supertest, Jest and Faker. It includes GH Actions pipeline.
## Running project locally
- Clone repository locally
- Generate bearer authentication token here: [Go REST access tokens](https://gorest.co.in/my-account/access-tokens)
- Save it as a local environment variable named `API_BEARER_TOKEN`
- Install [node.js](https://nodejs.org/en)
- Install dependencies `npm install` - this should install Supertest, Jest and Faker
- Run tests `npm run test`

You can also see test runs including test reports in [GH pipeline](https://github.com/Nerinny/GoRestAPITests/actions). Generated during run test report is in specific run Artifacts section. Bearer token in pipeline is saved as a GH secret.

## Project structure overview
- **.github/workflows/jest.yml** - GH workflow configuration
- **/Config/config.js** - configuration of API for tests
- **/Helpers/requestHelpers.js** - helper with API methods using Supertest and config
- **/Report** - generated during run, contains report
- **/Specs** - contains files with test suites that are divided by operation type, each with multiple test cases per operation
- **/TestData/requestTestData.js** - test user data with properties populated by Faker
- **/TestData/responseExpectedData.js** - expected response messages for tests
- **jest.config.js** - Jest and reports configuration
