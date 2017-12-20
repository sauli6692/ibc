import * as _ from 'lodash';

const commons = {
    type: 'object',
    properties: {
        discipleshipId: {
            type: 'integer',
            minimum: 1
        },
        id: {
            type: 'integer',
            minimum: 1
        },
        name: {
            type: 'string',
            maxLength: 150
        },
        description: {
            type: 'string',
            maxLength: 150
        }
    },
    additionalProperties: false
};

const create = {
    required: ['id', 'discipleshipId', 'name']
};

export const schemas = {
    create: _.merge(create, commons),
    update: commons
};
