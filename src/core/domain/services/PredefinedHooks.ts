import * as lodash from 'lodash';
const commonHooks = require('feathers-hooks-common');
const Ajv = require('ajv');

import { IServiceHooks, IHook, ISchema } from './IService';
import { BaseService } from './BaseService';

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

		this.validationHooks(beforeHooks);

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

	/*
	* Schema Validations Hooks
	*/
	private validationHooks(beforeHooks: IHook): void {
		let schemas = this._service.schemas;

		beforeHooks.create.push(this.validateSchema(schemas.create));
		beforeHooks.update.push(this.validateSchema(schemas.update));
	}

	private validateSchema(schema: ISchema): Function {
		return commonHooks.validateSchema(schema, Ajv);
	}
}
