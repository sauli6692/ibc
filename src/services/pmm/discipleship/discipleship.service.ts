import { BaseSequelizeService } from '../../../core/domain/services';
import { Discipleship } from './discipleship.model';

export class DiscipleshipService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'discipleships',
            model: Discipleship,
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
