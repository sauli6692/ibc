export const schemas = {
    create: {
        type: 'object',
        properties: {
            name: {
                type: 'string',
                maxLenght: 25
            },
            description: {
                type: 'string',
                maxLenght: 255
            }
        },
        additionalProperties: false,
        required: ['name']
    },
    update: {
        type: 'object',
        properties: {
            name: {
                type: 'string',
                maxLenght: 25
            },
            description: {
                type: 'string',
                maxLenght: 255
            }
        }
    }
};
