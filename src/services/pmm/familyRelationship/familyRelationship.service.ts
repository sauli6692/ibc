import { BaseSequelizeService, ISchema } from '../../../core/domain/services';
import { FamilyRelationship } from './familyRelationship.model';

export class FamilyRelationshipService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'family-relationships',
            model: FamilyRelationship
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
