import { BaseSequelizeService, ISchema } from '../../../core/domain/services';
import { Person } from './person.model';
import { hooks } from './person.hooks';
import { schemas } from './person.schema';

export class PersonService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'people',
            model: Person,
            hooks,
            schemas
        };
    }
}
