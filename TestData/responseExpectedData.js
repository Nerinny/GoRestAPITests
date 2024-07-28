module.exports = {
    incompleteUserResponses:
    {
        email: [
            { field: 'email', message: "can't be blank" },
        ],
        name: [
            { field: 'name', message: "can't be blank" },
        ],
        gender: [
            { field: 'gender', message: "can't be blank, can be male of female" },
        ],
        status: [
            { field: 'status', message: "can't be blank" },
        ]
    },

    duplicateUserRespose: 
        [{ field: 'email', message: 'has already been taken' }],

    unauthorizedUserResponse:
        { "message": "Authentication failed" },

    notFoundResourceResponse:
        { "message": "Resource not found" }
    
}