import { BaseSequelizeService, ISchema } from '../../../core/domain/services';
import { Occupation } from './occupation.model';
import { schemas } from './occupation.schema';

export class OccupationService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'occupations',
            model: Occupation,
            schemas
        };
    }
}
