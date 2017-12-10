import * as lodash from 'lodash';

const commons = {
    type: 'object',
    properties: {
        date: {
            format: 'date',
            formatMinimum: '2000-01-01',
            formatMaximum: (new Date()).toISOString().split('T')[0]
        }
    },
    additionalProperties: false
};

const create = {
    properties: {
        harvestId: {
            type: 'string',
            minimum: 1
        }
    },
    required: ['harvestId', 'date']
};

const update = {
    required: ['date']
};

export const schemas = {
    create: lodash.merge(create, commons),
    update: lodash.merge(update, commons)
};
