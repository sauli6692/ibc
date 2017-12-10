import { BaseSequelizeService } from '../../../core/domain/services';
import { IntegrationLevel } from './integrationLevel.model';
import { schemas } from './integrationLevel.schema';

export class IntegrationLevelService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'integration-levels',
            model: IntegrationLevel,
            schemas
        };
    }
}
