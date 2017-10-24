import { BaseSequelizeService, ISchema } from '../../../core/domain/services';
import { Model } from './model.model';

export class ModelService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'models',
            model: Model
        };
    }

    protected defineCreateSchema(): ISchema {
        return {};
    }

    protected defineUpdateSchema(): ISchema {
        return {};
    }
}
