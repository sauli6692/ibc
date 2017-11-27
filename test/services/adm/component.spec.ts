import * as lodash from 'lodash';
const Sequelize = require('sequelize');

const app = require('../../../src/app');
const serviceRoute = '/adm/components';

describe('Component Service', () => {
    let componentService: any;
    let components = [{
        id: 1,
        name: 'ADM',
        description: 'Administration'
    }, {
        id: 2,
        name: 'PMM',
        description: 'People management'
    }, {
        id: 3,
        name: 'MIN',
        description: 'Ministries'
    }];
    const componentModel = app.getModel('Component');

    const getById = (id: number) => {
        return lodash.find(components, component => component.id === id);
    };
    beforeAll(() => {
        componentService = app.service(serviceRoute);
        spyOn(componentModel, 'count').and.returnValue(Promise.resolve(components.length));

        spyOn(componentModel, 'findAll').and.callFake((params: any) => {
            let id = lodash.isInteger(params.where.id) || lodash.isNil(params.where.id) ? params.where.id : params.where.id.$in[0];

            if (lodash.isNil(id)) {
                return Promise.resolve(components);
            }
            let result = lodash.filter(components, (component) => component.id === id);

            return Promise.resolve(result);
        });
        spyOn(componentModel, 'create').and.callFake((data: any) => {
            let id = components[components.length - 1].id + 1;
            data.id = id;
            components.push(data);
            let result = componentModel.build(data);
            return Promise.resolve(result);
        });
        spyOn(componentModel, 'findById').and.callFake((id: number, options: any) => {
            let index = lodash.findIndex(components, c => c.id === id);
            let item: any = components[index];
            let instance = componentModel.build(item);
            spyOn(instance, 'update').and.callFake((data: any, options: any) => {
                components[index] = lodash.assign(item, data);
                components[index].id = id;
                return Promise.resolve(componentModel.build(components[index]));
            });
            return Promise.resolve(instance);
        });
        spyOn(componentModel, 'update').and.callFake((data: any, options: any) => {
            let item = getById(options.where.id);
            item.name = lodash.isNil(data.name) ? item.name : data.name;
            item.description = lodash.isNil(data.description) ? item.description : data.description;

            return Promise.resolve([item]);
        });
        spyOn(componentModel, 'destroy').and.callFake((options: any) => {
            let id = options.where.id;
            let index = lodash.findIndex(components, c => c.id === id);
            let item = getById(id);
            components.splice(index, 1);
            return Promise.resolve(item);
        });
    });

    it('should be defined', () => {
        expect(componentService).toBeDefined();
    });

    it('should return values when find is called', (done) => {
        componentService.find()
            .then((result: any) => {
                expect(result).toBeDefined();
                expect(result.total).toBe(components.length);
                expect(result.data).toEqual(components);
                done();
            });
    });

    it('should return a value when get is called', (done) => {
        let id = 3;
        componentService.get(id)
            .then((result: any) => {
                expect(result).toBeDefined();
                expect(result).toEqual(getById(id));
                done();
            });
    });

    it('should return an updated instance (not just the properties) when update is called', (done) => {
        let id = 2;
        let newValues = {
            name: 'PMM2'
        };
        componentService.update(id, newValues).then((result: any) => {
                let updatedRow = getById(id);

                expect(result).toBeDefined();
                expect(result.id).toBeDefined();
                expect(result.id).toBe(updatedRow.id);
                expect(result).toEqual(updatedRow);
                expect(result.name).toBe(newValues.name);
                expect(result.description).toBeNull();
                done();
            });
    });

    it('should return an updated an instance with its updated properties when patch is called', (done) => {
        let id = 2;
        let newValues = {
            description: 'People management module'
        };
        componentService.patch(id, newValues).then((result: any) => {
                let updatedRow = getById(id);

                expect(result).toBeDefined();
                expect(result.id).toBeDefined();
                expect(result.id).toBe(updatedRow.id);
                expect(result).toEqual(updatedRow);
                expect(result.name).toBeDefined();
                expect(result.name).toBe(updatedRow.name);
                expect(result.description).toBe(newValues.description);
                done();
            });
    });

    it('should return the removed instance by id when remove is called', (done) => {
        let id = 2;
        let item = getById(id);

        componentService.remove(id).then((result: any) => {
                expect(result).toBeDefined();
                expect(result).toEqual(item);
                expect(getById(id)).toBeUndefined();

                done();
            });
    });
});
