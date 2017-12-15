import * as lodash from 'lodash';

const commons = {
    type: 'object',
    properties: {
        privileges: {
            type: 'string',
            maxLength: 4,
            minLength: 1,
            pattern: '(c*r*u*d*){1}'
        }
    },
    additionalProperties: false
};
const create = {
    properties: {
        serviceId: {
            type: 'integer',
            minimum: 1
        }
    },
    required: ['serviceId', 'privileges']
};

const update = {
    required: ['privileges']
};

export const schemas = {
    create: lodash.merge(create, commons),
    update: lodash.merge(update, commons)
};
