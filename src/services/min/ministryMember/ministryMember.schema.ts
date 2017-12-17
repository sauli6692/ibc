export const schemas = {
    create: {
        type: 'object',
        properties: {
            memberId: {
                type: 'integer',
                minimum: 1
            }
        },
        additionalProperties: false,
        required: ['memberId']
    }
};
