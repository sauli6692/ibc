import { MinistryService } from './ministry/ministry.service';
import { MinistryObjectiveService } from './ministryObjective/ministryObjective.service';
import { MinistryLeaderService } from './ministryLeader/ministryLeader.service';
import { LeaderMinistryService } from './ministryLeader/leaderMinistry.service';

export const min = {
    name: 'min',
    services: {
        ministry: MinistryService,
        ministryObjective: MinistryObjectiveService,
        ministryLeader: MinistryLeaderService,
        leaderMinistry: LeaderMinistryService
    }
};
