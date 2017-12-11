import { BaseSequelizeService } from '../../../core/domain/services';
import { Collaborator } from './collaborator.model';
import { schemas } from './collaborator.schema';

export class CollaboratorService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'collaborators',
            model: Collaborator,
            id: 'memberId',
            schemas
        };
    }
}
