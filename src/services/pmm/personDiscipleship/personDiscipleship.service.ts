import { BaseSequelizeService, ISchema } from '../../../core/domain/services';
import { PersonDiscipleship } from './personDiscipleship.model';

export class PersonDiscipleshipService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'person-discipleships',
            model: PersonDiscipleship
        };
    }

    protected defineCreateSchema(): ISchema {
        return {};
    }

    protected defineUpdateSchema(): ISchema {
        return {};
    }
}
