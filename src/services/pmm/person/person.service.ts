import { BaseSequelizeService, ISchema } from '../../../core/domain/services';
import { Person } from './person.model';

export class PersonService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'people',
            model: Person
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
