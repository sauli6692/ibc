import { BaseSequelizeService } from '../../../core/domain/services/BaseSequelizeService';
import { Collaborator } from './collaborator.model';

export class CollaboratorService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'collaborators',
            model: Collaborator
        };
    }
}
