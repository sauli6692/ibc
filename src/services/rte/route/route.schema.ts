import * as lodash from 'lodash';

const commons = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            maxLength: 50
        },
        directionMain: {
            type: 'string',
            maxLength: 150
        },
        directionExtra: {
            type: 'string',
            maxLength: 150
        },
        zoneMap: {
            type: 'string'
        }
    },
    additionalProperties: false
};

const create = {
    required: ['name', 'directionMain']
};

export const schemas = {
    create: lodash.merge(create, commons),
    update: commons
};
