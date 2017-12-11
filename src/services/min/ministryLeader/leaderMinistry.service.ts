import * as lodash from 'lodash';
import * as Errors from 'feathers-errors';

import { BaseCustomService, IService } from '../../../core/domain/services';
import { BaseModel } from '../../../core/domain/models';
import { MinistryLeader } from './ministryLeader.model';
import { schemas } from './leaderMinistry.schema';

export class LeaderMinistryService extends BaseCustomService implements IService {
    private MinistryLeader: any;
    private Member: any;
    private Ministry: any;

    constructor(component: string, app: any) {
        super(component, app);
        let model = new MinistryLeader(this.component, this.app);
        this.MinistryLeader = model.getSequelizeModel();
    }

    public afterInit(): void {
        this.Member = this.app.getModel('Member');
        this.Ministry = this.app.getModel('Ministry');
    }

    protected define() {
        return {
            route: 'leaders/:leaderId/ministries',
            schemas
        };
    }

    public find(params: any): Promise<any> {
        return this.Member.findAll({
            where: { personId: params.leaderId },
            include: [{
                model: this.Ministry,
                as: 'ministries'
            }]
        }).then((results: any) => {
            if (lodash.isEmpty(results)) {
                throw new Errors.NotFound('Leader not found.');
            }

            return lodash.map(results[0].ministries, (ministry: any) => {
                return {
                    id: ministry.id,
                    name: ministry.name,
                    description: ministry.description
                };
            });
        });
    }

    public get(id: number, params: any): Promise<any> {
        return this.Member.findAll({
            where: { personId: params.leaderId },
            include: [{
                model: this.Ministry,
                as: 'ministries',
                where: { id }
            }]
        }).then((results: any) => {
            if (lodash.isEmpty(results)) {
                throw new Errors.NotFound('Not foud.');
            }
            let ministry = results[0].ministries[0];

            return {
                id: ministry.id,
                name: ministry.name,
                description: ministry.description
            };
        });
    }

    public create(data: any, params: any): Promise<any> {
        data.leaderId = lodash.parseInt(params.leaderId);

        return this.MinistryLeader.build(data).save();
    }

    public remove(id: number, params: any): Promise<any> {
        let where: any = {
            leaderId: params.leaderId
        };

        if (!lodash.isNil(id)) {
            where.ministryId = id;
        }

        return this.MinistryLeader.destroy({ where });
    }
}
