import BaseModel from './BaseModel';
import IServiceHooks from './IServiceHooks';
import IHook from './IHook';
import * as lodash from 'lodash';
const sequelizeService = require('feathers-sequelize');

export default abstract class BaseService {
	private _component: string;
	private _name: string;
	private _hooks: IServiceHooks;
	private _filters: Function;
	private _model: BaseModel;
	private _app: any;

	constructor(component: string, app: any) {
		this._app = app;

		let definition = this.define();
		this._component = component;
		this._name = definition.name;
		this._model = new definition.model(component, this.app);
		this._hooks = this.defineHooks();
		this._filters = this.defineFilters();
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
	get filters(): Function {
		return this._filters;
	}

	public createService(): void {
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

	protected abstract define(): { name: string, model: any };

	protected defineHooks(): IServiceHooks {
		let hook: IHook = {
			all: [],
			find: [],
			get: [],
			create: [],
			update: [],
			patch: [],
			remove: []
		};

		return {
			before: hook,
			after: hook,
			error: hook
		};
	}

	protected defineFilters(): Function {
		return null;
	}
}
