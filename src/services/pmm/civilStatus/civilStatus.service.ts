import { BaseSequelizeService } from '../../../core/domain/services';
import { CivilStatus } from './civilStatus.model';

export class CivilStatusService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'civil-statuses',
            model: CivilStatus,
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
