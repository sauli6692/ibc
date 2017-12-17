import * as _ from 'lodash';
const commons = {
    type: 'object',
    properties: {
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
    properties: {
        discipleshipId: {
            type: 'integer',
            minimum: 1
        }
    },
    required: ['discipleshipId', 'teacherId']
};

export const schemas = {
    create: _.merge(create, commons),
    update: commons
};
