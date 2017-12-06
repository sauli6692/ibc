import { BaseSequelizeService, ISchema } from '../../../core/domain/services';
import { Person } from './person.model';
import { hooks } from './person.hooks';

export class PersonService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'people',
            model: Person,
            hooks,
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
