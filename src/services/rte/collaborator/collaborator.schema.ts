import * as lodash from 'lodash';
const commons = {
    type: 'object',
    properties: {
        routeId: {
            type: 'integer',
            minimum: 1
        },
        ministryId: {
            type: 'integer',
            minimum: 1
        },
        routeLeader: {
            type: 'boolean'
        }
    },
    additionalProperties: false
};

const create = {
    properties: {
        memberId: {
            type: 'integer',
            minimum: 1
        }
    },
    required: ['memberId', 'routeId']
};

export const schemas = {
    create: lodash.merge(create, commons),
    update: commons
};
