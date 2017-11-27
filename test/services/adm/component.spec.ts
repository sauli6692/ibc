import * as lodash from 'lodash';
const Sequelize = require('sequelize');

import helpers from '../helpers';
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

    beforeAll(() => {
        componentService = app.service(serviceRoute);
        helpers.setCRUDSpies(componentModel, components);
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
                expect(result).toEqual(helpers.getById(components, id));
                done();
            });
    });

    it('should return an updated instance (not just the properties) when update is called', (done) => {
        let id = 2;
        let newValues = {
            name: 'PMM2'
        };
        componentService.update(id, newValues).then((result: any) => {
                let updatedRow = helpers.getById(components, id);

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
                let updatedRow = helpers.getById(components, id);

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
        let item = helpers.getById(components, id);

        componentService.remove(id).then((result: any) => {
                expect(result).toBeDefined();
                expect(result).toEqual(item);
                expect(helpers.getById(components, id)).toBeUndefined();

                done();
            });
    });
});
