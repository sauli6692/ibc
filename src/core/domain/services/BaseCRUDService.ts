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

        this._model = model;
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
        let nameService = `/${this.component}/${this.name}`;

        this.app.use(nameService, sequelizeService(options));
        const service = this.app.service(nameService);

        service.hooks(this.hooks);

        if (!lodash.isNil(service.filter) && !lodash.isNil(this.filters)) {
            service.filter(this.filters);
        }
    }

    protected abstract define(): { name: string, model: any };
}
