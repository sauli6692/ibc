export interface IService {
    find?: (param: any) => Promise<any>;
    get?: (id: any, params: any) => Promise<any>;
    create?: (data: any, params: any) => Promise<any>;
    update?: (id: any, data: any, params: any) => Promise<any>;
    patch?: (id: any, data: any, params: any) => Promise<any>;
    remove?: (id: any, params: any) => Promise<any>;
    setup?: (app: any, path: string) => Promise<any>;
}

export interface IServiceHooks {
	before: IHook;
	after: IHook;
	error: IHook;
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

export interface ISchema {
    id?: string;
    title?: string;
    description?: string;
    type?: string; // 'object', 'array'
    constant?: string;
    contains?: any; // for type 'array'
    items?: Array<any>; // for type 'array'
    additionalItems?: any; // for type 'array'
    uniqueItems?: boolean; // for type 'array'
    properties?: any; // for type 'object'
    additionalProperties?: any; // for type 'object'
}
