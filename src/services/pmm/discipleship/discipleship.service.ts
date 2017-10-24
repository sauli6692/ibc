import { BaseSequelizeService, ISchema } from '../../../core/domain/services';
import { Discipleship } from './discipleship.model';

export class DiscipleshipService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'discipleships',
            model: Discipleship
        };
    }

    protected defineCreateSchema(): ISchema {
        return {};
    }

    protected defineUpdateSchema(): ISchema {
        return {};
    }
}
