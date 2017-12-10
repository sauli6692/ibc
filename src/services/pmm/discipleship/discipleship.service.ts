import { BaseSequelizeService } from '../../../core/domain/services';
import { Discipleship } from './discipleship.model';
import { schemas } from './discipleship.schema';

export class DiscipleshipService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'discipleships',
            model: Discipleship,
            schemas
        };
    }
}
