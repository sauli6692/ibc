import { logger } from '../../utils/logger';
import { BaseService } from './BaseService';
import { BaseModel } from '../models/BaseModel';
import { IServiceHooks, IHook } from './IService';
import * as lodash from 'lodash';
const sequelizeService = require('feathers-sequelize');

export abstract class BaseSequelizeService extends BaseService {
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

    protected defineService(): void {
        let options: any = {
            name: this.route,
            Model: this.model.getSequelizeModel(),
            paginate: this.app.get('paginate')
        };

        this.app.use(this.servicePath, sequelizeService(options));
        logger.debug('Sequelize Service Created: ', this.servicePath);
    }

    protected abstract define(): { route: string, model: any };
}
