import * as lodash from 'lodash';
import * as Errors from 'feathers-errors';

import { BaseCustomService, IService } from '../../../core/domain/services';
import { BaseModel } from '../../../core/domain/models';
import { Family } from './family.model';
import { schemas } from './family.schema';

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
            if (lodash.isEmpty(results)) {
                throw new Errors.NotFound('Person not found.');
            }

            return results; // [0].family;
        });
    }

    public get(id: number, params: any): Promise<any> {
        return this.Person.findAll({
            where: {
                id: params.personId
            },
            include: [{
                model: this.Person,
                as: 'family',
                where: { id }
            }]
        }).then((results: any) => {
            if (lodash.isEmpty(results)) {
                throw new Errors.NotFound('Not found.');
            }
            return results[0].family[0];
        });
    }

    public create(data: any, params: any): Promise<any> {
        data.personId = lodash.parseInt(params.personId);
        return this.Family.build(data).save().then(() => {
            data.personId = data.familyId;
            data.familyId = lodash.parseInt(params.personId);

            return this.Family.build(data).save();
        });
    }

    public remove(id: number, params: any): Promise<any> {
        let where: any = {
            personId: params.personId
        };

        if (!lodash.isNil(id)) {
            where.familyId = id;
        }

        return this.Family.destroy({ where }).then(() => {
            if (!lodash.isNil(where.familyId)) {
                where.personId = where.familyId;
            }

            where.familyId = params.personId;

            return this.Family.destroy({ where });
        });
    }
}
