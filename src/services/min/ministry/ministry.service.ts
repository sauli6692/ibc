import { BaseSequelizeService } from '../../../core/domain/services';
import { Ministry } from './ministry.model';
import { schemas } from './ministry.schema';

export class MinistryService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'ministries',
            model: Ministry,
            schemas
        };
    }
}
