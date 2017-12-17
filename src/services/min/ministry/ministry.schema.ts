import * as _ from 'lodash';

const commons = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            maxLength: 100
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
    create: _.merge(create, commons),
    update: commons
};
