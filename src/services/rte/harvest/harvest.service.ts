import { BaseSequelizeService, ISchema } from '../../../core/domain/services';
import { Harvest } from './harvest.model';

export class HarvestService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'harvests',
            model: Harvest
        };
    }

    protected defineCreateSchema(): ISchema {
        return {};
    }

    protected defineUpdateSchema(): ISchema {
        return {};
    }
}
