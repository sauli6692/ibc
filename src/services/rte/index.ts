import { VisitService } from './visit/visit.service';
import { RouteService } from './route/route.service';
import { HarvestService } from './harvest/harvest.service';
import { CollaboratorService } from './collaborator/collaborator.service';

export const rte = {
    name: 'rte',
    services: {
        visit: VisitService,
        route: RouteService,
        harvest: HarvestService,
        collaborator: CollaboratorService,
    }
};
