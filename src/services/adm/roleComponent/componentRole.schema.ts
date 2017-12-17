export const schemas = {
    create: {
        type: 'object',
        properties: {
            roleId: {
                type: 'integer',
                minimum: 1
            }
        },
        required: ['roleId'],
        additionalProperties: false
    }
};
