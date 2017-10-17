import { BaseSequelizeService } from '../../../core/domain/services/BaseSequelizeService';
import { IntegrationLevel } from './integrationLevel.model';

export class IntegrationLevelService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'integration-levels',
            model: IntegrationLevel
        };
    }
}
