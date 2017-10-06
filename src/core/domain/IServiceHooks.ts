export interface IServiceHooks {
	before: any;
	after: any;
	error: any;
}

export interface IHook {
    all: Array<any>;
    find: Array<any>;
    get: Array<any>;
    create: Array<any>;
    update: Array<any>;
    patch: Array<any>;
    remove: Array<any>;
}
