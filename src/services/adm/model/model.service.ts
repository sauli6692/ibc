import { BaseSequelizeService } from '../../../core/domain/services';
import { Model } from './model.model';
import { schemas } from './model.schema';

export class ModelService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'models',
            model: Model,
            schemas
        };
    }
}
