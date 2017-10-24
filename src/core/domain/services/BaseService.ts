import { BaseModel } from '../models/BaseModel';
import { IServiceHooks, IHook, ISchema } from './IService';
import { PredefinedHooks } from './PredefinedHooks';
import * as lodash from 'lodash';

export abstract class BaseService {
	private _app: any;
	private _component: string;
	private _route: string;
	private _servicePath: any;
	private _hooks: IServiceHooks;
	private _filters: Function;
	private _schemas: { create: ISchema, update: ISchema };

	constructor(component: string, app: any) {
		this._app = app;
		let { route } = this.define();

		this._component = component;
		this._route = route;
		this._servicePath = `/${this.component}/${this.route}`;
        this._schemas = {
            create: this.defineCreateSchema(),
            update: this.defineUpdateSchema()
        };
		this._hooks = this.getHooks();
        this._filters = this.defineFilters();
	}

	get component(): string {
		return this._component;
	}
	get route(): string {
		return this._route;
	}
	get servicePath(): string {
		return this._servicePath;
	}
	get app(): any {
		return this._app;
	}
	get hooks(): any {
		return this._hooks;
	}
	get filters(): Function {
		return this._filters;
	}
	get schemas(): { create: ISchema, update: ISchema } {
		return this._schemas;
	}

	set route(route: string) {
		this._route = route;
	}

	public createService(): void {
		this.defineService();
		const service = this.app.service(this.servicePath);

		service.hooks(this.hooks);

		if (!lodash.isNil(service.filter) && !lodash.isNil(this.filters)) {
			service.filter(this.filters);
		}
	}

    private getHooks(): IServiceHooks {
		let predefinedHooks = new PredefinedHooks(this).hooks;
        let serviceHooks = this.defineHooks();

        return lodash.assign(predefinedHooks, serviceHooks);
    }

	protected abstract defineService(): void;

	protected abstract define(): { route: string };

	protected abstract defineCreateSchema(): ISchema;

	protected abstract defineUpdateSchema(): ISchema;

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
