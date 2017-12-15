import * as lodash from 'lodash';
import * as Errors from 'feathers-errors';

import { BaseCustomService, IService } from '../../../core/domain/services';
import { BaseModel } from '../../../core/domain/models';
import { ComponentService } from './componentService.model';
import { schemas } from './componentService.schema';

export class ComponentServiceService extends BaseCustomService implements IService {
    private ComponentService: any;
    private Component: any;
    private Service: any;

    constructor(component: string, app: any) {
        super(component, app);
        let model = new ComponentService(this.component, this.app);
        this.ComponentService = model.getSequelizeModel();
    }

    public afterInit(): void {
        this.Component = this.app.getModel('Component');
        this.Service = this.app.getModel('Service');
    }

    protected define() {
        return {
            route: 'components/:componentId/services',
            schemas,
            authenticate: false
        };
    }

    public find(params: any): Promise<any> {
        let property = isNaN(params.componentId) ? 'name' : 'id';

        return this.Component.findAll({
            where: { [property]: params.componentId },
            include: [{
                model: this.Service,
                as: 'services',
                through: {
                    as: 'privileges',
                    attributes: ['privileges']
                }
            }]
        }).then((results: any) => {
            if (lodash.isEmpty(results)) {
                throw new Errors.NotFound('Component not found.');
            }
            return lodash.map(results[0].services, (service: any) => {
                return {
                    id: service.id,
                    route: service.route,
                    privileges: service.privileges.privileges
                };
            });
        });
    }

    public get(id: any, params: any): Promise<any> {
        let serviceProperty = isNaN(id) ? 'route' : 'id';
        let componentProperty = isNaN(params.componentId) ? 'name' : 'id';
        return this.Component.findAll({
            where: { [componentProperty]: params.componentId },
            include: [{
                model: this.Service,
                as: 'services',
                through: {
                    as: 'privileges',
                    attributes: ['privileges']
                },
                where: { [serviceProperty]: id }
            }]
        }).then((results: any) => {
            if (lodash.isEmpty(results)) {
                throw new Errors.NotFound('Not found.');
            }
            let service = results[0].services[0];
            return {
                id: service.id,
                route: service.route,
                privileges: service.privileges.privileges
            };
        });
    }

    public create(data: any, params: any): Promise<any> {
        data.componentId = lodash.parseInt(params.componentId);

        return this.ComponentService.build(data).save();
    }

    public patch(id: number, data: any, params: any): Promise<any> {
        let where = {
            componentId: params.componentId,
            serviceId: id
        };

        return this.ComponentService.update({
            privileges: data.privileges
        }, { where });
    }

    public remove(id: number, params: any): Promise<any> {
        let where: any = {
            componentId: params.componentId
        };

        if (!lodash.isNil(id)) {
            where.serviceId = id;
        }

        return this.ComponentService.destroy({ where });
    }
}
