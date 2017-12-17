export const schemas = {
    create: {
        type: 'object',
        properties: {
            roleId: {
                type: 'integer',
                minimum: 1
            }
        },
        additionalProperties: false,
        required: ['roleId']
    }
};
