import * as _ from 'lodash';
import * as Errors from 'feathers-errors';

import { BaseCustomService, IService } from '../../../core/domain/services';
import { BaseModel } from '../../../core/domain/models';
import { Visit } from './visit.model';
import { schemas } from './visit.schema';

export class VisitService extends BaseCustomService implements IService {
    private Visit: any;
    private Collaborator: any;
    private Harvest: any;
    private Member: any;
    private Person: any;

    constructor(component: string, app: any) {
        super(component, app);
        let model = new Visit(this.component, this.app);
        this.Visit = model.getSequelizeModel();
    }

    public afterInit(): void {
        this.Collaborator = this.app.getModel('rte', 'Collaborator');
        this.Harvest = this.app.getModel('rte', 'Harvest');
        this.Member = this.app.getModel('pmm', 'Member');
        this.Person = this.app.getModel('pmm', 'Person');
    }

    protected define() {
        return {
            route: 'collaborators/:collaboratorId/visits',
            schemas
        };
    }

    public find(params: any): Promise<any> {
        return this.Collaborator.findAll({
            where: { memberId: params.collaboratorId },
            include: [{
                model: this.Harvest,
                as: 'visits',
                include: [{
                    model: this.Person,
                    as: 'information'
                }]
            }]
        }).then((results: any) => {
            if (_.isEmpty(results)) {
                throw new Errors.NotFound('Collaborator not found.');
            }

            return _.map(results[0].visits, (row: any) => {
                return {
                    date: row.Visit.date,
                    route: row.routeId,
                    harvest: _.merge({
                        discarded: row.discarded,
                        discardedReason: row.discardedReason,
                    }, row.information.dataValues)
                };
            });
        });
    }

    public get(id: number, params: any): Promise<any> {
        return this.Collaborator.findAll({
            where: { memberId: params.collaboratorId },
            include: [{
                model: this.Harvest,
                as: 'visits',
                include: [{
                    model: this.Person,
                    as: 'information'
                }],
                where: { personId: id }
            }]
        }).then((results: any) => {
            if (_.isEmpty(results)) {
                throw new Errors.NotFound('Not found.');
            }

            let row = results[0].visits[0];
            return {
                date: row.Visit.date,
                route: row.routeId,
                harvest: _.merge({
                    discarded: row.discarded,
                    discardedReason: row.discardedReason,
                }, row.information.dataValues)
            };
        });
    }

    public create(data: any, params: any): Promise<any> {
        data.collaboratorId = _.parseInt(params.collaboratorId);

        return this.Visit.build(data).save();
    }

    public patch(id: number, data: any, params: any): Promise<any> {
        let where: any = {
            collaboratorId: params.collaboratorId,
            harvestId: id
        };

        return this.Visit.update({
            date: data.date
        }, { where });
    }

    public remove(id: number, params: any): Promise<any> {
        let where: any = {
            collaboratorId: params.collaboratorId
        };

        if (!_.isNil(id)) {
            where.harvestId = id;
        }

        return this.Visit.destroy({ where });
    }
}
