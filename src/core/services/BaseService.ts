import BaseModel from '../models/BaseModel';
import IServiceOptionals from './IServiceOptionals';
import * as lodash from 'lodash';
const sequelizeService = require('feathers-sequelize');

export default class BaseService {
  private _name: string;
  private _hooks: any;
  private _filters: Function = null;
  private _model: BaseModel;
  private _app: any;

  constructor(name: string, model: BaseModel, app: any, optionals?: IServiceOptionals) {
    this._name = name;
    this._model = model;
    this._app = app;
    if (!lodash.isNil(optionals)) {
      this.hooks = optionals.hooks;
      this._filters = optionals.filters;
    }
  }

  get name(): string {
    return this._name;
  }
  get app(): any {
    return this._app;
  }
  get model(): BaseModel {
    return this._model;
  }
  get hooks(): any {
    return this._hooks;
  }
  set hooks(hooks: any) {
    let hook: any = {
      all: [],
      find: [],
      get: [],
      create: [],
      update: [],
      patch: [],
      remove: []
    };

    if (lodash.isNil(hooks)) {
      this._hooks = {
        before: hook,
        after: hook,
        error: hook
      };
    } else {
      this._hooks = hooks;
    }
  }
  get filters(): Function {
    return this._filters;
  }

  public config(): void {
    let options: any = {
      name: this.name,
      Model: this.model.getSequelizeModel(),
      paginate: this.app.get('paginate')
    };

    this.app.use(`/${this.name}`, sequelizeService(options));
    const service = this.app.service(this.name);

    service.hooks(this.hooks);

    if (!lodash.isNil(service.filter) && !lodash.isNil(this.filters)) {
      service.filter(this.filters);
    }
  }
}
