import { BaseSequelizeService, ISchema } from '../../../core/domain/services';
import { Harvest } from './harvest.model';
import { hooks } from './harvest.hooks';

export class HarvestService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'harvests',
            model: Harvest,
            hooks
        };
    }

    protected defineCreateSchema(): ISchema {
        return {
            type: 'object'
        };
    }

    protected defineUpdateSchema(): ISchema {
        return {
            type: 'object'
        };
    }
}
