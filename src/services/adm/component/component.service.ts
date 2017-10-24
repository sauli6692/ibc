import { BaseSequelizeService, ISchema } from '../../../core/domain/services';
import { Component } from './component.model';

export class ComponentService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'components',
            model: Component
        };
    }

    protected defineCreateSchema(): ISchema {
        return {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    maxLenght: 25
                },
                description: {
                    type: 'string',
                    maxLenght: 255
                }
            },
            additionalProperties: false,
            required: ['name']
        };
    }

    protected defineUpdateSchema(): ISchema {
        return {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    maxLenght: 25
                },
                description: {
                    type: 'string',
                    maxLenght: 255
                }
            }
        };
    }
}
