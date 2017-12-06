import { BaseSequelizeService } from '../../../core/domain/services';
import { Collaborator } from './collaborator.model';

export class CollaboratorService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'collaborators',
            model: Collaborator,
            id: 'memberId',
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
