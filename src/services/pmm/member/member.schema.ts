const commons = {
    type: 'object',
    properties: {
        personId: {
            type: 'integer',
            minimum: 1
        }
    },
    additionalProperties: false,
    required: ['personId']
};

export const schemas = {
    create: commons,
    update: commons
};
