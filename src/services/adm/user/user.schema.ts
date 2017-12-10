import * as lodash from 'lodash';

const commons = {
    type: 'object',
    properties: {
        username: {
            type: 'string',
            maxLength: 50
        },
        password: {
            type: 'string',
            maxLength: 64
        },
        memberId: {
            type: 'integer'
        }
    },
    additionalProperties: false
};

const create = {
    required: ['username', 'password', 'memberId']
};

export const schemas = {
    create: lodash.merge(create, commons),
    update: commons
};
