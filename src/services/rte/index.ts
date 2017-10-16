import { VisitService } from './visit/visit.service';
import { RouteService } from './route/route.service';
import { HarvestService } from './harvest/harvest.service';

export const rte = {
    name: 'rte',
    services: {
        visit: VisitService,
        route: RouteService,
        harvest: HarvestService
    }
};
