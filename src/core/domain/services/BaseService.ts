import { BaseModel } from '../models/BaseModel';
import { IServiceHooks, IHook } from './IServiceHooks';
import * as lodash from 'lodash';

export abstract class BaseService {
	private _component: string;
	private _name: string;
	private _hooks: IServiceHooks;
	private _filters: Function;
	private _app: any;

	constructor(component: string, app: any) {
		this._app = app;

		let { name } = this.define();


		this._component = component;
		this._name = name;
		this._hooks = this.defineHooks();
		this._filters = this.defineFilters();
	}

	get component(): string {
        return this._component;
    }
    get name(): string {
		return this._name;
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
    set name(name: string) {
        this._name = name;
    }

	public abstract createService(): void;

	protected abstract define(): { name: string };

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
