import * as lodash from 'lodash';

export const schemas = {
    create: {
        type: 'object',
        properties: {
            componentId: {
                type: 'integer',
                minimum: 1
            }
        },
        required: ['componentId'],
        additionalProperties: false
    }
};
