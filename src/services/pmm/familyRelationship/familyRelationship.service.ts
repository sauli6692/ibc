import { BaseSequelizeService } from '../../../core/domain/services';
import { FamilyRelationship } from './familyRelationship.model';
import { schemas } from './familyRelationship.schema';

export class FamilyRelationshipService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'family-relationships',
            model: FamilyRelationship,
            schemas
        };
    }
}
