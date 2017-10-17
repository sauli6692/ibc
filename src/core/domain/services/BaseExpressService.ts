import { logger } from '../../utils/logger';
import * as lodash from 'lodash';
const sequelizeService = require('feathers-sequelize');

import { BaseService } from './BaseService';
import { IServiceHooks, IHook } from './IService';

export abstract class BaseExpressService extends BaseService {
    constructor(component: string, app: any) {
        super(component, app);
        this.isFeathersService = false;
    }

    protected defineService(): void {
        let methods: string[] = ['find', 'get', 'create', 'update', 'patch', 'remove', 'setup'];

        let service = lodash.reduce(methods, (prev: any, methodName: string) => {
            let method = this[methodName]();
            if (!lodash.isNil(method)) {
                prev[methodName] = method;
            }
            return prev;
        }, {});

        this.app.use(this.servicePath, service);
        logger.debug('Express Service Created: ', this.servicePath);
    }

    protected abstract define(): { route: string };

    protected find(): (params: any) => Promise<any> {
        return null;
    }
    protected get(): (id: any, params: any) => Promise<any> {
        return null;
    }
    protected create(): (data: any, params: any) => Promise<any> {
        return null;
    }
    protected update(): (id: any, data: any, params: any) => Promise<any> {
        return null;
    }
    protected patch(): (id: any, data: any, params: any) => Promise<any> {
        return null;
    }
    protected remove(): (id: any, params: any) => Promise<any> {
        return null;
    }
    protected setup(): (app: any, path: any) => Promise<any> {
        return null;
    }
}
