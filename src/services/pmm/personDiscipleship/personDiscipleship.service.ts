import { BaseSequelizeService } from '../../../core/domain/services/BaseSequelizeService';
import { PersonDiscipleship } from './personDiscipleship.model';

export class PersonDiscipleshipService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'person-discipleships',
            model: PersonDiscipleship
        };
    }
}
