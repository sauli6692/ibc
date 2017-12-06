import { BaseSequelizeService } from '../../../core/domain/services';
import { Ministry } from './ministry.model';

export class MinistryService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'ministries',
            model: Ministry,
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
