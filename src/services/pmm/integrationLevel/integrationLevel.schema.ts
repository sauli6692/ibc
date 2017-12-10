const commons = {
    type: 'object',
    properties: {
        value: {
            type: 'string',
            maxLength: 20
        }
    },
    additionalProperties: false,
    required: ['value']
};

export const schemas = {
    create: commons,
    update: commons
};
