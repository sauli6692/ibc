import * as _ from 'lodash';

const commons = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            maxLength: 150
        },
        description: {
            type: 'string',
            maxLength: 150
        },
        discipleshipId: {
            type: 'integer',
            minimum: 1
        }
    },
    additionalProperties: false
};

const create = {
    required: ['name', 'discipleshipId']
};

export const schemas = {
    create: _.merge(create, commons),
    update: commons
};
