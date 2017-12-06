import { BaseSequelizeService } from '../../../core/domain/services';
import { Harvest } from './harvest.model';
import { hooks } from './harvest.hooks';

export class HarvestService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'harvests',
            model: Harvest,
            hooks,
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
