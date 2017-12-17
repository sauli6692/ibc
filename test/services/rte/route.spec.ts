import * as _ from 'lodash';
const Sequelize = require('sequelize');

import helpers from '../helpers';
const app = require('../../../src/app');
const serviceRoute = '/rte/routes';

describe('Route Service', () => {
    let routeService: any;
    let routes = [{
        id: 1,
        name: 'Route 1',
        directionMain: 'Main Direction 1',
        directionExtra: '',
        zoneMap: ''
    }, {
        id: 2,
        name: 'Route 2',
        directionMain: 'Main Direction 2',
        directionExtra: '',
        zoneMap: ''
    }, {
        id: 3,
        name: 'Route 3',
        directionMain: 'Main Direction 3',
        directionExtra: 'Extra',
        zoneMap: ''
    }];
    const routeModel = app.getModel('rte', 'Route');

    beforeAll(() => {
        routeService = app.service(serviceRoute);
        helpers.setCRUDSpies(routeModel, routes);
    });

    it('should be defined', () => {
        expect(routeService).toBeDefined();
        expect(routeService).not.toBeNull();
    });

    it('should return values when find is called', (done) => {
        routeService.find()
            .then((result: any) => {
                expect(result).toBeDefined();
                expect(result.total).toBe(routes.length);
                expect(result.data).toEqual(routes);
                done();
            });
    });

    it('should return a value when get is called', (done) => {
        let id = 2;
        routeService.get(id)
            .then((result: any) => {
                expect(result).toBeDefined();
                expect(result).toEqual(helpers.getById(routes, id));
                done();
            });
    });

    it('should return a new instance when create is called', (done) => {
        let prevLength = routes.length;
        let newValues = {
            name: 'Route 4',
            directionMain: 'Main Direction 4',
            directionExtra: '',
            zoneMap: ''
        };
        routeService.create(newValues).then((result: any) => {
                expect(result).toBeDefined();
                expect(result.id).toBeDefined();
                expect(result.id).toBe(prevLength + 1);
                expect(result.name).toBeDefined();
                expect(result.name).toBe(newValues.name);
                expect(result.directionMain).toBeDefined();
                expect(result.directionMain).toBe(newValues.directionMain);
                expect(result.directionExtra).toBeDefined();
                expect(result.directionExtra).toBe(newValues.directionExtra);
                expect(result.zoneMap).toBeDefined();
                expect(result.zoneMap).toBe(newValues.zoneMap);
                expect(routes.length).toBe(prevLength + 1);

                done();
            });
    });

    it('should return an updated instance (not just the properties) when update is called', (done) => {
        let id = 2;
        let newValues = {
            name: 'Route 3'
        };
        routeService.update(id, newValues).then((result: any) => {
                let updatedRow = helpers.getById(routes, id);

                expect(result).toBeDefined();
                expect(result.id).toBeDefined();
                expect(result.id).toBe(updatedRow.id);
                expect(result).toEqual(updatedRow);
                expect(result.name).toBe(newValues.name);
                expect(result.directionMain).toBeNull();
                expect(result.directionExtra).toBeNull();
                expect(result.zoneMap).toBeNull();
                done();
            });
    });

    it('should return an updated an instance with its updated properties when patch is called', (done) => {
        let id = 2;
        let newValues = {
            directionMain: 'Route 3'
        };
        routeService.patch(id, newValues).then((result: any) => {
                let updatedRow = helpers.getById(routes, id);

                expect(result).toBeDefined();
                expect(result.id).toBeDefined();
                expect(result.id).toBe(updatedRow.id);
                expect(result).toEqual(updatedRow);
                expect(result.name).toBe(updatedRow.name);
                expect(result.directionMain).toBe(newValues.directionMain);
                expect(result.directionExtra).toBe(updatedRow.directionExtra);
                expect(result.zoneMap).toBe(updatedRow.zoneMap);
                done();
            });
    });

    it('should return the removed instance by id when remove is called', (done) => {
        let id = 2;
        let item = helpers.getById(routes, id);

        routeService.remove(id).then((result: any) => {
                expect(result).toBeDefined();
                expect(result).toEqual(item);
                expect(helpers.getById(routes, id)).toBeUndefined();

                done();
            });
    });
});
