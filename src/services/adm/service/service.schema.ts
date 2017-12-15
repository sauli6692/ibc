const commons = {
    type: 'object',
    properties: {
        route: {
            type: 'string',
            maxLength: 50
        }
    },
    additionalProperties: false,
    required: ['route']
};

export const schemas = {
    create: commons,
    update: commons
};
