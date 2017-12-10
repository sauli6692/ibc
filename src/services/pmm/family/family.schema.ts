import * as lodash from 'lodash';

const commons = {
    type: 'object',
    properties: {
        familyId: {
            type: 'integer',
            minimum: 1
        },
        relationship: {
            type: 'integer',
            minimum: 1
        }
    },
    additionalProperties: false
};

const create = {
    required: ['familyId', 'relationship']
};

export const schemas = {
    create: lodash.merge(create, commons),
    update: commons
};
