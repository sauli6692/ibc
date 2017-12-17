import * as _ from 'lodash';
import * as Errors from 'feathers-errors';

import { BaseCustomService, IService } from '../../../core/domain/services';
import { BaseModel } from '../../../core/domain/models';
import { Family } from './family.model';
import { schemas } from './family.schema';
import { logger } from '../../../core/utils/logger';

export class FamilyService extends BaseCustomService implements IService {
    private Family: any;
    private Person: any;
    private FamilyRelationship: any;

    constructor(component: string, app: any) {
        super(component, app);
        let model = new Family(this.component, this.app);
        this.Family = model.getSequelizeModel();
    }

    public afterInit(): void {
        this.Person = this.app.getModel('Person');
        this.FamilyRelationship = this.app.getModel('FamilyRelationship');
    }

    protected define() {
        return {
            route: 'people/:personId/family',
            schemas
        };
    }

    public find(params: any): Promise<any> {
        return this.Family.findAll({
            where: { personId: params.personId },
            include: [{
                model: this.Person,
                as: 'familyPerson'
            }, {
                model: this.FamilyRelationship,
                as: 'familyRelationship'
            }]
        }).then((results: any) => {
            if (_.isEmpty(results)) {
                throw new Errors.NotFound('Person not found.');
            }

            return _.map(results, (row: any) => {
                let result = row.familyPerson.dataValues;
                result.relationship = row.familyRelationship.value;
                return result;
            });
        });
    }

    public get(id: number, params: any): Promise<any> {
        return this.Family.findAll({
            where: { personId: params.personId },
            include: [{
                model: this.Person,
                as: 'familyPerson'
            }, {
                model: this.FamilyRelationship,
                as: 'familyRelationship'
            }]
        }).then((results: any) => {
            if (_.isEmpty(results)) {
                throw new Errors.NotFound('Not found.');
            }

            let family = results[0].familyPerson.dataValues;
            family.relationship = results[0].familyRelationship.value;
            return family;
        });
    }

    public create(data: any, params: any): Promise<any> {
        data.personId = _.parseInt(params.personId);
        return this.Family.build(data).save().then(() => {
            data.personId = data.familyId;
            data.familyId = _.parseInt(params.personId);

            return this.Family.build(data).save();
        });
    }

    public patch(id: number, data: any, params: any): Promise<any> {
        let where: any = {
            personId: params.personId,
            familyId: id
        };

        return this.Family.update({
            relationship: data.relationship
        }, { where });
    }

    public remove(id: number, params: any): Promise<any> {
        let where: any = {
            personId: params.personId
        };

        if (!_.isNil(id)) {
            where.familyId = id;
        }

        return this.Family.destroy({ where }).then(() => {
            if (!_.isNil(where.familyId)) {
                where.personId = where.familyId;
            }

            where.familyId = params.personId;

            return this.Family.destroy({ where });
        });
    }
}
