import * as lodash from 'lodash';
const commons = {
    type: 'object',
    properties: {
        discipleshipId: {
            type: 'integer',
            minimum: 1
        },
        teacherId: {
            type: 'integer',
            minimum: 1
        },
        lastLessonId: {
            type: 'integer',
            minimum: 1
        },
        startDate: {
            format: 'date',
            formatMinimum: '1917-01-01',
            formatMaximum: (new Date()).toISOString().split('T')[0]
        },
        endDate: {
            format: 'date',
            formatMinimum: '1917-01-01',
            formatMaximum: (new Date()).toISOString().split('T')[0]
        }
    },
    additionalProperties: false
};

const create = {
    required: ['discipleshipId', 'teacherId']
};

export const schemas = {
    create: lodash.merge(create, commons),
    update: commons
};
