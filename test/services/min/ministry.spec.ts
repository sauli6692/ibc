import * as _ from 'lodash';
const Sequelize = require('sequelize');

import helpers from '../helpers';
const app = require('../../../src/app');
const serviceRoute = '/min/ministries';

describe('Ministry Service', () => {
    let ministryService: any;
    let ministries = [{
        id: 1,
        name: 'Routes',
        description: 'Routes'
    }, {
        id: 2,
        name: 'Administration',
        description: 'Admon'
    }, {
        id: 3,
        name: 'Ladies',
        description: 'Ladies'
    }];

    beforeAll(() => {
        const ministryModel = app.getModel('min', 'Ministry');

        ministryService = app.service(serviceRoute);
        helpers.setCRUDSpies(ministryModel, ministries);
    });

    it('should be defined', () => {
        expect(ministryService).toBeDefined();
        expect(ministryService).not.toBeNull();
    });

    it('should return values when find is called', (done) => {
        ministryService.find()
            .then((result: any) => {
                expect(result).toBeDefined();
                expect(result.total).toBe(ministries.length);
                expect(result.data).toEqual(ministries);
                done();
            });
    });

    it('should return a value when get is called', (done) => {
        let id = 3;
        ministryService.get(id)
            .then((result: any) => {
                expect(result).toBeDefined();
                expect(result).toEqual(helpers.getById(ministries, id));
                done();
            });
    });

    it('should return a new instance when create is called', (done) => {
        let prevLength = ministries.length;
        let newValues = {
            name: 'Pray',
            description: 'Pray'
        };
        ministryService.create(newValues).then((result: any) => {
                expect(result).toBeDefined();
                expect(result.id).toBeDefined();
                expect(result.id).toBe(prevLength + 1);
                expect(result.name).toBeDefined();
                expect(result.name).toBe(newValues.name);
                expect(result.description).toBeDefined();
                expect(result.description).toBe(newValues.description);
                expect(ministries.length).toBe(prevLength + 1);
                done();
            });
    });

    it('should return an updated instance (not just the properties) when update is called', (done) => {
        let id = 2;
        let newValues = {
            name: 'Administration2'
        };
        ministryService.update(id, newValues).then((result: any) => {
                let updatedRow = helpers.getById(ministries, id);

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
            description: 'Administration ministry'
        };
        ministryService.patch(id, newValues).then((result: any) => {
                let updatedRow = helpers.getById(ministries, id);

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
        let item = helpers.getById(ministries, id);

        ministryService.remove(id).then((result: any) => {
                expect(result).toBeDefined();
                expect(result).toEqual(item);
                expect(helpers.getById(ministries, id)).toBeUndefined();

                done();
            });
    });
});
