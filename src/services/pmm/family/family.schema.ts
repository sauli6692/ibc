import * as _ from 'lodash';

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
    create: _.merge(create, commons),
    update: _.merge(update, commons)
};
