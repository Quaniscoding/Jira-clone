module.exports = {
    "/api/postAvatarUser/{id}": {
        put: {
            tags: ["User"],
            "operationId": "postAvatar",
            "consumes": [
                "multipart/form-data",
                "image/png"
            ],
            parameters: [
                {
                    name: "token",
                    in: "header",
                    description: "Nhập token",
                    required: true,
                    type: "string",
                },
                {
                    name: "id",
                    in: "path",
                    required: true,
                    type: "string",
                },
            ],
            requestBody: {
                required: true,
                content: {
                    "multipart/form-data": {
                        schema: {
                            type: "object",
                            properties: {
                                dataUpload: {
                                    type: "string",
                                    format: "binary",
                                },
                            },
                        },
                    },
                },
            },
            responses: {
                "200": {
                    description: "Success",
                },
            },
        },
    }
};