import { logger } from '../../utils/logger';
import * as lodash from 'lodash';
const sequelizeService = require('feathers-sequelize');

import { BaseService } from './BaseService';
import { IServiceHooks, IHook } from './IService';

export abstract class BaseCustomService extends BaseService {
    constructor(component: string, app: any) {
        super(component, app);
    }

    protected defineService(): void {
        let methods: string[] = ['find', 'get', 'create', 'update', 'patch', 'remove', 'setup'];

        let service = lodash.reduce(methods, (prev: any, methodName: string) => {
            let method: Function = this[methodName];

            if (!lodash.isNil(method)) {
                prev[methodName] = method;
            }
            return prev;
        }, this);

        this.app.service(this.servicePath, service);
        logger.debug('Custom Service Created: ', this.servicePath);
    }

    protected abstract define(): { route: string };
}
