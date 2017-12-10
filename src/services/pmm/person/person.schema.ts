import * as lodash from 'lodash';

const commons = {
    type: 'object',
    properties: {
        firstname: {
            type: 'string',
            maxLength: 50
        },
        lastname: {
            type: 'string',
            maxLength: 50
        },
        birthday: {
            format: 'date',
            formatMinimum: '1917-01-01',
            formatMaximum: (new Date()).toISOString().split('T')[0]
        },
        newBirthday: {
            format: 'date',
            formatMinimum: '1917-01-01',
            formatMaximum: (new Date()).toISOString().split('T')[0]
        },
        baptized: {
            type: 'boolean'
        },
        integrationLevel: {
            type: 'integer',
            minimum: 1
        },
        gender: {
            type: 'string',
            maxLength: 1
        },
        occupation: {
            type: 'integer',
            minimum: 1
        },
        civilStatus: {
            type: 'integer',
            minimum: 1
        },
        lastVisit: {
            format: 'date',
            formatMinimum: '2016-01-01',
            formatMaximum: (new Date()).toISOString().split('T')[0]
        },
        invitedById: {
            type: 'integer',
            minimum: 1
        },
        directionMain: {
            type: 'string',
            maxLength: 150
        },
        directionExtra: {
            type: 'string',
            maxLength: 150
        }
    },
    additionalProperties: false
};

const create = {
    required: ['firstname', 'lastname']
};

export const schemas = {
    create: lodash.merge(create, commons),
    update: commons
};
