import { BaseSequelizeService, ISchema } from '../../../core/domain/services';
import { IntegrationLevel } from './integrationLevel.model';

export class IntegrationLevelService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'integration-levels',
            model: IntegrationLevel
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
