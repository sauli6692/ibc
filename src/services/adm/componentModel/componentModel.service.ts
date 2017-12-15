import * as lodash from 'lodash';
import * as Errors from 'feathers-errors';

import { BaseCustomService, IService } from '../../../core/domain/services';
import { BaseModel } from '../../../core/domain/models';
import { ComponentModel } from './componentModel.model';
import { schemas } from './componentModel.schema';

export class ComponentModelService extends BaseCustomService implements IService {
    private ComponentModel: any;
    private Component: any;
    private Model: any;

    constructor(component: string, app: any) {
        super(component, app);
        let model = new ComponentModel(this.component, this.app);
        this.ComponentModel = model.getSequelizeModel();
    }

    public afterInit(): void {
        this.Component = this.app.getModel('Component');
        this.Model = this.app.getModel('Model');
    }

    protected define() {
        return {
            route: 'components/:componentId/models',
            schemas,
            authenticate: false
        };
    }

    public find(params: any): Promise<any> {
        let property = isNaN(params.componentId) ? 'name' : 'id';
        return this.Component.findAll({
            where: { [property]: params.componentId },
            include: [{
                model: this.Model,
                as: 'models',
                through: {
                    as: 'privileges',
                    attributes: ['privileges']
                }
            }]
        }).then((results: any) => {
            if (lodash.isEmpty(results)) {
                throw new Errors.NotFound('Component not found.');
            }
            return lodash.map(results[0].models, (model: any) => {
                return {
                    id: model.id,
                    name: model.name,
                    privileges: model.privileges.privileges
                };
            });
        });
    }

    public get(id: any, params: any): Promise<any> {
        let modelProperty = isNaN(id) ? 'name' : 'id';
        let componentProperty = isNaN(params.componentId) ? 'name' : 'id';
        return this.Component.findAll({
            where: { [componentProperty]: params.componentId },
            include: [{
                model: this.Model,
                as: 'models',
                through: {
                    as: 'privileges',
                    attributes: ['privileges']
                },
                where: { [modelProperty]: id }
            }]
        }).then((results: any) => {
            if (lodash.isEmpty(results)) {
                throw new Errors.NotFound('Not found.');
            }
            let model = results[0].models[0];
            return {
                id: model.id,
                name: model.name,
                privileges: model.privileges.privileges
            };
        });
    }

    public create(data: any, params: any): Promise<any> {
        data.componentId = lodash.parseInt(params.componentId);

        return this.ComponentModel.build(data).save();
    }

    public patch(id: number, data: any, params: any): Promise<any> {
        let where = {
            componentId: params.componentId,
            modelId: id
        };

        return this.ComponentModel.update({
            privileges: data.privileges
        }, { where });
    }

    public remove(id: number, params: any): Promise<any> {
        let where: any = {
            componentId: params.componentId
        };

        if (!lodash.isNil(id)) {
            where.modelId = id;
        }

        return this.ComponentModel.destroy({ where });
    }
}
