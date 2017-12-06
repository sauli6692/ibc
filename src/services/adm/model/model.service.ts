import { BaseSequelizeService } from '../../../core/domain/services';
import { Model } from './model.model';

export class ModelService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'models',
            model: Model,
            schemas: {
                create: {
                    type: 'object'
                },
                update: {
                    type: 'object'
                }
            }
        };
    }
}
