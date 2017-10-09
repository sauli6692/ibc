import { BaseCRUDService } from '../../../core/domain/services/BaseCRUDService';
import { Component } from './component.model';

export class ComponentService extends BaseCRUDService {
    protected define() {
        return {
            name: 'components',
            model: Component
        };
    }
}
