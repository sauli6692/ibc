import { BaseSequelizeService } from '../../../core/domain/services';
import { MinistryObjective } from './ministryObjective.model';
import { schemas } from './ministryObjective.schema';

export class MinistryObjectiveService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'ministry-objectives',
            model: MinistryObjective,
            schemas
        };
    }
}
