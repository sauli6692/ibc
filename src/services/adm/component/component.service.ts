import { BaseSequelizeService } from '../../../core/domain/services';
import { Component } from './component.model';
import { schemas } from './component.schema';

export class ComponentService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'components',
            model: Component,
            schemas
        };
    }
}
