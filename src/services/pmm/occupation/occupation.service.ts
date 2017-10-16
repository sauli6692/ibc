import { BaseCRUDService } from '../../../core/domain/services/BaseCRUDService';
import { Occupation } from './occupation.model';

export class OccupationService extends BaseCRUDService {
    protected define() {
        return {
            name: 'occupations',
            model: Occupation
        };
    }
}
