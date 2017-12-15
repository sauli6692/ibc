import * as lodash from 'lodash';
const Sequelize = require('sequelize');

import helpers from '../helpers';
const app = require('../../../src/app');
const serviceRoute = '/adm/services';

describe('Service Service', () => {
    let serviceService: any;
    let services = [{
        id: 1,
        route: 'component'
    }, {
        id: 2,
        route: 'model'
    }, {
        id: 3,
        route: 'user'
    }];
    const serviceModel = app.getModel('Service');

    beforeAll(() => {
        serviceService = app.service(serviceRoute);
        helpers.setCRUDSpies(serviceModel, services);
    });

    it('should be defined', () => {
        expect(serviceService).toBeDefined();
        expect(serviceService).not.toBeNull();
    });

    it('should return values when find is called', (done) => {
        serviceService.find()
            .then((result: any) => {
                expect(result).toBeDefined();
                expect(result.total).toBe(services.length);
                expect(result.data).toEqual(services);
                done();
            });
    });

    it('should return a value when get is called', (done) => {
        let id = 3;
        serviceService.get(id)
            .then((result: any) => {
                expect(result).toBeDefined();
                expect(result).toEqual(helpers.getById(services, id));
                done();
            });
    });

    it('should return a new instance when create is called', (done) => {
        let prevLength = services.length;
        let newValues = {
            route: 'person'
        };
        serviceService.create(newValues).then((result: any) => {
                expect(result).toBeDefined();
                expect(result.id).toBeDefined();
                expect(result.id).toBe(prevLength + 1);
                expect(result.route).toBeDefined();
                expect(result.route).toBe(newValues.route);
                expect(services.length).toBe(prevLength + 1);
                done();
            });
    });

    it('should return an updated instance (not just the properties) when update is called', (done) => {
        let id = 2;
        let newValues = {
            route: 'service/1'
        };
        serviceService.update(id, newValues).then((result: any) => {
                let updatedRow = helpers.getById(services, id);

                expect(result).toBeDefined();
                expect(result.id).toBeDefined();
                expect(result.id).toBe(updatedRow.id);
                expect(result).toEqual(updatedRow);
                expect(result.route).toBe(newValues.route);
                done();
            });
    });

    it('should return an updated an instance with its updated properties when patch is called', (done) => {
        let id = 2;
        let newValues = {
            route: 'service/2'
        };
        serviceService.patch(id, newValues).then((result: any) => {
                let updatedRow = helpers.getById(services, id);

                expect(result).toBeDefined();
                expect(result.id).toBeDefined();
                expect(result.id).toBe(updatedRow.id);
                expect(result).toEqual(updatedRow);
                expect(result.route).toBeDefined();
                expect(result.route).toBe(updatedRow.route);
                expect(result.route).toBe(newValues.route);
                done();
            });
    });

    it('should return the removed instance by id when remove is called', (done) => {
        let id = 2;
        let item = helpers.getById(services, id);

        serviceService.remove(id).then((result: any) => {
                expect(result).toBeDefined();
                expect(result).toEqual(item);
                expect(helpers.getById(services, id)).toBeUndefined();

                done();
            });
    });
});
