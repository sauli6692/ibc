import { BaseSequelizeService } from '../../../core/domain/services';
import { FamilyRelationship } from './familyRelationship.model';

export class FamilyRelationshipService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'family-relationships',
            model: FamilyRelationship,
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
