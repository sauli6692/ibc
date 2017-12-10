const commons = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            maxLength: 25
        }
    },
    additionalProperties: false,
    required: ['name']
};

export const schemas = {
    create: commons,
    update: commons
};
