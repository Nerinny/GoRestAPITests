module.exports = {
    testMatch: ['**/Specs/*.spec.js'],
    reporters: [
        'default',
        [
            'jest-html-reporters',
            {
                publicPath: './Report',
                filename: 'report.html',
                pageTitle: 'GoRest API Test Report',
                overwrite: true,
                expand: true,
            },
        ],
    ],
};