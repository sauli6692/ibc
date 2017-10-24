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
        return {};
    }

    protected defineUpdateSchema(): ISchema {
        return {};
    }
}
