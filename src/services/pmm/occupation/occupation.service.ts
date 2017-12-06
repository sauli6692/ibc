import { BaseSequelizeService, ISchema } from '../../../core/domain/services';
import { Occupation } from './occupation.model';

export class OccupationService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'occupations',
            model: Occupation,
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
