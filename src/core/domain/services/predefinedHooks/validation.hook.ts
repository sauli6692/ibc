import * as _ from 'lodash';
const commonHooks = require('feathers-hooks-common');
const Ajv = require('ajv');

import { IServiceHooks, IHook, ISchema } from '../IService';

export const validationHooks = (schemas: { create: ISchema, update?: ISchema } , beforeHooks: IHook): void => {
    if (!_.isNil(schemas)) {
        beforeHooks.create.push(validateSchema(schemas.create));

        if (!_.isNil(schemas.update)) {
            beforeHooks.update.push(validateSchema(schemas.update));
            beforeHooks.patch.push(validateSchema(schemas.update));
        }
    }
};

const validateSchema = (schema: ISchema): Function => {
    return commonHooks.validateSchema(schema, Ajv, {
        allErrors: true,
        format: 'full',
        addNewError: addNewError
    });
};

const addNewError = (prev: any, ajvError: any, itemsLen: number, index: number): any => {
    let property;
    let message;
    prev = prev || {};

    switch (ajvError.keyword) {
        case 'additionalProperties':
            property = ajvError.params.additionalProperty;
            message = 'invalid property';
            break;
        case 'required':
            property = ajvError.params.missingProperty;
            message = 'required';
            break;
        default:
            property = ajvError.dataPath.split('.')[1];
            message = ajvError.message;
    }
    prev[property] = message;
    return prev;
};
