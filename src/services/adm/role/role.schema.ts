import * as lodash from 'lodash';

const commons = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            maxLength: 25
        },
        description: {
            type: 'string',
            maxLength: 255
        }
    },
    additionalProperties: false
};

const create = {
    required: ['name']
};

export const schemas = {
    create: lodash.merge(create, commons),
    update: commons
};