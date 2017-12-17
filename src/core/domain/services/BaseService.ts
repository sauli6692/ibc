import { BaseModel } from '../models/BaseModel';
import { IServiceHooks, IHook, ISchema } from './IService';
import { PredefinedHooks } from './predefinedHooks';
import * as lodash from 'lodash';

export abstract class BaseService {
	private _app: any;
	private _component: string;
	private _route: string;
	private _servicePath: any;
	private _hooks: IServiceHooks;
	private _filters: Function;
	private _schemas: { create: ISchema, update?: ISchema };
	private _authenticate: boolean;

	constructor(component: string, app: any) {
		this._app = app;
		let { route, hooks, filters, schemas, authenticate } = this.define();

		this._component = component;
		this._route = route;
		this._authenticate = lodash.isNil(authenticate) || authenticate;
		this._servicePath = `/${this.component}/${this.route}`;
        this._schemas = schemas;
        this._hooks = this.getHooks(hooks);
        this._filters = filters || null;
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
	get schemas(): { create: ISchema, update?: ISchema } {
		return this._schemas;
	}
    get authenticate(): boolean {
		return this._authenticate;
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

	public afterInit(): void { }

    private getHooks(hooks: IServiceHooks): IServiceHooks {
		let predefinedHooks = new PredefinedHooks(this).hooks;
        let serviceHooks = hooks || {};

		lodash.forOwn(predefinedHooks, (hook, type) => {
			lodash.forOwn(hook, (value, key) => {
                if (lodash.isNil(serviceHooks[type])) {
                    serviceHooks[type] = {};
                }
				hook[key] = lodash.concat(value, serviceHooks[type][key] || []);
			});
		});

        return predefinedHooks;
    }

	protected abstract defineService(): void;

	protected abstract define(): {
        route: string,
		schemas?: {
			create: ISchema,
			update?: ISchema
		},
        hooks?: IServiceHooks,
		authenticate?: boolean,
        filters?: Function
    };
}
