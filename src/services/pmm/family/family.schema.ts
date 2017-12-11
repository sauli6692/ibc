import * as lodash from 'lodash';

const commons = {
    type: 'object',
    properties: {
        relationship: {
            type: 'integer',
            minimum: 1
        }
    },
    additionalProperties: false
};

const create = {
    properties: {
        familyId: {
            type: 'integer',
            minimum: 1
        }
    },
    required: ['familyId', 'relationship']
};

const update = {
    required: ['relationship']
};

export const schemas = {
    create: lodash.merge(create, commons),
    update: lodash.merge(update, commons)
};
