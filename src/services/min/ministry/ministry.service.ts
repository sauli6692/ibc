import { BaseSequelizeService, ISchema } from '../../../core/domain/services';
import { Ministry } from './ministry.model';

export class MinistryService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'ministries',
            model: Ministry
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
