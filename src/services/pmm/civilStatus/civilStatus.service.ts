import { BaseSequelizeService } from '../../../core/domain/services/BaseSequelizeService';
import { CivilStatus } from './civilStatus.model';

export class CivilStatusService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'civil-statuses',
            model: CivilStatus
        };
    }
}
