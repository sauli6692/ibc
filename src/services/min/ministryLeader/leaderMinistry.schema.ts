export const schemas = {
    create: {
        type: 'object',
        properties: {
            ministryId: {
                type: 'integer',
                minimum: 1
            }
        },
        additionalProperties: false,
        required: ['ministryId']
    }
};
