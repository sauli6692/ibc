import { BaseSequelizeService } from '../../../core/domain/services';
import { IntegrationLevel } from './integrationLevel.model';

export class IntegrationLevelService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'integration-levels',
            model: IntegrationLevel,
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
