import * as _ from 'lodash';
const commons = {
    type: 'object',
    properties: {
        routeId: {
            type: 'integer',
            minimum: 1
        },
        discarded: {
            type: 'boolean'
        },
        discardedReason: {
            type: 'string',
            maxLength: 100
        }
    },
    additionalProperties: false
};

const create = {
    properties: {
        personId: {
            type: 'integer',
            minimum: 1
        }
    },
    required: ['personId', 'routeId']
};

export const schemas = {
    create: _.merge(create, commons),
    update: commons
};
