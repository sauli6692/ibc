import { BaseSequelizeService, ISchema } from '../../../core/domain/services';
import { MinistryObjective } from './ministryObjective.model';

export class MinistryObjectiveService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'ministry-objectives',
            model: MinistryObjective
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
