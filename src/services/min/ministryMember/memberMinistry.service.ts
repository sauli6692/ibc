import * as lodash from 'lodash';
import * as Errors from 'feathers-errors';

import { BaseCustomService, IService } from '../../../core/domain/services';
import { BaseModel } from '../../../core/domain/models';
import { MinistryMember } from './ministryMember.model';
import { schemas } from './ministryMember.schema';

export class MemberMinistryService extends BaseCustomService implements IService {
    private MinistryMember: any;
    private Member: any;
    private Ministry: any;

    constructor(component: string, app: any) {
        super(component, app);
        let model = new MinistryMember(this.component, this.app);
        this.MinistryMember = model.getSequelizeModel();
    }

    public afterInit(): void {
        this.Member = this.app.getModel('Member');
        this.Ministry = this.app.getModel('Ministry');
    }

    protected define() {
        return {
            route: 'members/:memberId/ministries',
            schemas
        };
    }

    public find(params: any): Promise<any> {
        return this.Member.findAll({
            where: { personId: params.memberId },
            include: [{
                model: this.Ministry,
                as: 'memberMinistries'
            }]
        }).then((results: any) => {
            if (lodash.isEmpty(results)) {
                throw new Errors.NotFound('Member not found.');
            }

            return lodash.map(results[0].memberMinistries, (ministry: any) => {
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
            where: { personId: params.memberId },
            include: [{
                model: this.Ministry,
                as: 'memberMinistries',
                where: { id }
            }]
        }).then((results: any) => {
            if (lodash.isEmpty(results)) {
                throw new Errors.NotFound('Not foud.');
            }
            let ministry = results[0].memberMinistries[0];

            return {
                id: ministry.id,
                name: ministry.name,
                description: ministry.description
            };
        });
    }

    public create(data: any, params: any): Promise<any> {
        data.memberId = lodash.parseInt(params.memberId);

        return this.MinistryMember.build(data).save();
    }

    public remove(id: number, params: any): Promise<any> {
        let where: any = {
            memberId: params.memberId
        };

        if (!lodash.isNil(id)) {
            where.ministryId = id;
        }

        return this.MinistryMember.destroy({ where });
    }
}
