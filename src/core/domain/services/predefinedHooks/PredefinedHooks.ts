import * as lodash from 'lodash';

import { IServiceHooks, IHook } from '../IService';
import { BaseService } from '../BaseService';

import { validationHooks } from './validation.hook';
import { authenticationHooks } from './authentication.hook';

export class PredefinedHooks {
	private _service: BaseService;
	private _hook: IHook = {
		all: [],
		find: [],
		get: [],
		create: [],
		update: [],
		patch: [],
		remove: []
	};
	private _hooks: IServiceHooks;

	constructor(service: BaseService) {
		this._service = service;
		this._hooks = {
			before: this.defineBeforeHooks(),
			after: this.defineAfterHooks(),
			error: this.defineErrorHooks()
		};
	}

	get hooks(): IServiceHooks {
		return this._hooks;
	}

	private defineBeforeHooks(): IHook {
		let beforeHooks = lodash.cloneDeep(this._hook);

		validationHooks(this._service.schemas, beforeHooks);

        if (this._service.authenticate && !this._service.app.get('authentication').bypass) {
            authenticationHooks(this._service.component, this._service.route, beforeHooks);
        }

		return beforeHooks;
	}

	private defineAfterHooks(): IHook {
		let afterHooks = lodash.cloneDeep(this._hook);
		return afterHooks;
	}

	private defineErrorHooks(): IHook {
		let errorHooks = lodash.cloneDeep(this._hook);
		return errorHooks;
	}
}
