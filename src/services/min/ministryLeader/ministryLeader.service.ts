import * as _ from 'lodash';
import * as Errors from 'feathers-errors';

import { BaseCustomService, IService, ISchema } from '../../../core/domain/services';
import { BaseModel } from '../../../core/domain/models';
import { MinistryLeader } from './ministryLeader.model';
import { schemas } from './ministryLeader.schema';

export class MinistryLeaderService extends BaseCustomService implements IService {
    private MinistryLeader: any;
    private Ministry: any;
    private Member: any;
    private Person: any;

    constructor(component: string, app: any) {
        super(component, app);
        let model = new MinistryLeader(this.component, this.app);
        this.MinistryLeader = model.getSequelizeModel();
    }

    public afterInit(): void {
        this.Ministry = this.app.getModel('Ministry');
        this.Member = this.app.getModel('Member');
        this.Person = this.app.getModel('Person');
    }

    protected define() {
        return {
            route: 'ministries/:ministryId/leaders',
            schemas
        };
    }

    public find(params: any): Promise<any> {
        return this.Ministry.findAll({
            where: { id: params.ministryId },
            include: [{
                model: this.Member,
                as: 'leaders',
                include: [{
                    model: this.Person,
                    as: 'information'
                }]
            }]
        }).then((results: any) => {
            if (_.isEmpty(results)) {
                throw new Errors.NotFound('Ministry not found.');
            }

            return _.map(results[0].leaders, (leader: any) => leader.information);
        });
    }

    public get(id: number, params: any): Promise<any> {
        return this.Ministry.findAll({
            where: { id: params.ministryId },
            include: [{
                model: this.Member,
                as: 'leaders',
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
            return results[0].leaders[0].information;
        });
    }

    public create(data: any, params: any): Promise<any> {
        data.ministryId = _.parseInt(params.ministryId);

        return this.MinistryLeader.build(data).save();
    }

    public remove(id: number, params: any): Promise<any> {
        let where: any = {
            ministryId: params.ministryId
        };

        if (!_.isNil(id)) {
            where.leaderId = id;
        }

        return this.MinistryLeader.destroy({ where });
    }
}
