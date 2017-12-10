import * as lodash from 'lodash';

const commons = {
    type: 'object',
    properties: {
        objective: {
            type: 'string',
            maxLength: 255
        },
        ministryId: {
            type: 'integer'
        }
    },
    additionalProperties: false
};

const create = {
    required: ['objective', 'ministryId']
};

export const schemas = {
    create: lodash.merge(create, commons),
    update: commons
};
