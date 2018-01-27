import { logger } from '../../utils/logger';
import * as _ from 'lodash';

import { BaseService } from './BaseService';
import { IServiceHooks, ISchema } from './IService';

export abstract class BaseCustomService extends BaseService {
    constructor(component: string, app: any) {
        super(component, app);
    }

    protected defineService(): void {
        let methods: string[] = ['find', 'get', 'create', 'update', 'patch', 'remove', 'setup'];

        let service = _.reduce(methods, (prev: any, methodName: string) => {
            let method: Function = this[methodName];

            if (!_.isNil(method)) {
                prev[methodName] = method;
            }
            return prev;
        }, this);

        this.app.use(this.servicePath, service);
        logger.debug('Custom Service Created: ', this.servicePath);
    }

    protected abstract define(): {
        route: string,
        schemas?: {
            create: ISchema,
            update?: ISchema
        },
        authenticate?: boolean,
        hooks?: IServiceHooks,
        filters?: Function
    };
}
