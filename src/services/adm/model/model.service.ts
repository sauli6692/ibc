import { BaseSequelizeService } from '../../../core/domain/services/BaseSequelizeService';
import { Model } from './model.model';

export class ModelService extends BaseSequelizeService {
    protected define() {
        return {
            name: 'models',
            model: Model
        };
    }
}
