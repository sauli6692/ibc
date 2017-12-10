import { BaseSequelizeService } from '../../../core/domain/services';
import { CivilStatus } from './civilStatus.model';
import { schemas } from './civilStatus.schema';

export class CivilStatusService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'civil-statuses',
            model: CivilStatus,
            schemas
        };
    }
}
