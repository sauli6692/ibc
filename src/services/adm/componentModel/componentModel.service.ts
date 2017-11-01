import * as lodash from 'lodash';
import * as Errors from 'feathers-errors';

import { BaseCustomService, IService, ISchema } from '../../../core/domain/services';
import { BaseModel } from '../../../core/domain/models';
import { ComponentModel } from './componentModel.model';

export class ComponentModelService extends BaseCustomService implements IService {
    private ComponentModel: any;
    private Component: any;
    private Model: any;

    constructor(component: string, app: any) {
        super(component, app);
        let model = new ComponentModel(this.component, this.app);
        this.ComponentModel = model.getSequelizeModel();
        this.Component = this.app.getModel('Component');
        this.Model = this.app.getModel('Model');
    }

    protected define() {
        return {
            route: 'components/:componentId/models'
        };
    }

    public find(params: any): Promise<any> {
        return this.Component.findAll({
            where: { id: params.componentId },
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
            return results[0].models;
        });
    }

    public get(id: number, params: any): Promise<any> {
        return this.Component.findAll({
            where: { id: params.componentId },
            include: [{
                model: this.Model,
                as: 'models',
                through: {
                    as: 'privileges',
                    attributes: ['privileges']
                },
                where: { id }
            }]
        }).then((results: any) => {
            if (lodash.isEmpty(results)) {
                throw new Errors.NotFound('Not found.');
            }
            return results[0].models[0];
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

    protected defineCreateSchema(): ISchema {
        return {
            type: 'object'
        };
    }

    protected defineUpdateSchema(): ISchema {
        return {
            type: 'object'
        };
    }
}
