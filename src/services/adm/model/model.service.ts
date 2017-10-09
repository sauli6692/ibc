import { BaseCRUDService } from '../../../core/domain/services/BaseCRUDService';
import { Model } from './model.model';

export class ModelService extends BaseCRUDService {
    protected define() {
        return {
            name: 'models',
            model: Model
        };
    }
}
