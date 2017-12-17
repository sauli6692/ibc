export const schemas = {
    create: {
        type: 'object',
        properties: {
            leaderId: {
                type: 'integer',
                minimum: 1
            }
        },
        additionalProperties: false,
        required: ['leaderId']
    }
};
