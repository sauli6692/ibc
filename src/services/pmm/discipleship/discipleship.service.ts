import { BaseSequelizeService } from '../../../core/domain/services/BaseSequelizeService';
import { Discipleship } from './discipleship.model';

export class DiscipleshipService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'discipleships',
            model: Discipleship
        };
    }
}
