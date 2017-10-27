import { MinistryService } from './ministry/ministry.service';
import { MinistryObjectiveService } from './ministryObjective/ministryObjective.service';

export const min = {
    name: 'min',
    services: {
        ministry: MinistryService,
        ministryObjective: MinistryObjectiveService
    }
};
