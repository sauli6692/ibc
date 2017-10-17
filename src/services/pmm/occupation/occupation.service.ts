import { BaseSequelizeService } from '../../../core/domain/services/BaseSequelizeService';
import { Occupation } from './occupation.model';

export class OccupationService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'occupations',
            model: Occupation
        };
    }
}
