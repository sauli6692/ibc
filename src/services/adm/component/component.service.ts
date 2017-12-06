import { BaseSequelizeService } from '../../../core/domain/services';
import { Component } from './component.model';

export class ComponentService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'components',
            model: Component,
            schemas: {
                create: {
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
                },
                update: {
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
                }
            }
        };
    }
}
