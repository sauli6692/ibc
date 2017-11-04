import { BaseSequelizeService, ISchema } from '../../../core/domain/services';
import { Collaborator } from './collaborator.model';

export class CollaboratorService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'collaborators',
            model: Collaborator,
            id: 'memberId'
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
