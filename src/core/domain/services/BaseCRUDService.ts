import { logger } from '../../utils/logger';
import { BaseService } from './BaseService';
import { BaseModel } from '../models/BaseModel';
import { IServiceHooks, IHook } from './IServiceHooks';
import * as lodash from 'lodash';
const sequelizeService = require('feathers-sequelize');

export abstract class BaseCRUDService extends BaseService {
    private _model: BaseModel;

    constructor(component: string, app: any) {
        super(component, app);

        let { model } = this.define();

        if (typeof model !== 'function')  {
            throw 'Needs to be a class';
        }

        this._model = new model(component, app);
    }

    get model(): BaseModel {
        return this._model;
    }

    public createService(): void {
        let options: any = {
            name: this.name,
            Model: this.model.getSequelizeModel(),
            paginate: this.app.get('paginate')
        };
        let servicePath = `/${this.component}/${this.name}`;

        this.app.use(servicePath, sequelizeService(options));
        logger.debug('Sequelize Service Created: ', servicePath);

        const service = this.app.service(servicePath);

        service.hooks(this.hooks);
        if (!lodash.isNil(service.filter) && !lodash.isNil(this.filters)) {
            service.filter(this.filters);
        }
    }

    protected defineName(): { name: string } {
        return {
            name: this.define().name
        };
    }

    protected abstract define(): { name: string, model: any };
}
