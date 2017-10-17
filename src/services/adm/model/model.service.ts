import { BaseSequelizeService } from '../../../core/domain/services/BaseSequelizeService';
import { Model } from './model.model';

export class ModelService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'models',
            model: Model
        };
    }
}
