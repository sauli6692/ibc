import * as _ from 'lodash';
const Sequelize = require('sequelize');

import helpers from '../helpers';
const app = require('../../../src/app');
const serviceRoute = '/pmm/civil-statuses';

describe('Civil Status Service', () => {
    let civilStatusService: any;
    let civilStatuses = [{
        id: 1,
        value: 'Single'
    }, {
        id: 2,
        value: 'Married'
    }, {
        id: 3,
        value: 'Divorced'
    }];
    const civilStatusModel = app.getModel('CivilStatus');

    beforeAll(() => {
        civilStatusService = app.service(serviceRoute);
        helpers.setCRUDSpies(civilStatusModel, civilStatuses);
    });

    it('should be defined', () => {
        expect(civilStatusService).toBeDefined();
        expect(civilStatusService).not.toBeNull();
    });

    it('should return values when find is called', (done) => {
        civilStatusService.find()
            .then((result: any) => {
                expect(result).toBeDefined();
                expect(result.total).toBe(civilStatuses.length);
                expect(result.data).toEqual(civilStatuses);
                done();
            });
    });

    it('should return a value when get is called', (done) => {
        let id = 3;
        civilStatusService.get(id)
            .then((result: any) => {
                expect(result).toBeDefined();
                expect(result).toEqual(helpers.getById(civilStatuses, id));
                done();
            });
    });

    it('should return a new instance when create is called', (done) => {
        let prevLength = civilStatuses.length;
        let newValues = {
            value: 'Person'
        };
        civilStatusService.create(newValues).then((result: any) => {
                expect(result).toBeDefined();
                expect(result.id).toBeDefined();
                expect(result.id).toBe(prevLength + 1);
                expect(result.value).toBeDefined();
                expect(result.value).toBe(newValues.value);
                expect(civilStatuses.length).toBe(prevLength + 1);
                done();
            });
    });

    it('should return an updated instance (not just the properties) when update is called', (done) => {
        let id = 2;
        let newValues = {
            value: 'CivilStatus1'
        };
        civilStatusService.update(id, newValues).then((result: any) => {
                let updatedRow = helpers.getById(civilStatuses, id);

                expect(result).toBeDefined();
                expect(result.id).toBeDefined();
                expect(result.id).toBe(updatedRow.id);
                expect(result).toEqual(updatedRow);
                expect(result.value).toBe(newValues.value);
                done();
            });
    });

    it('should return an updated an instance with its updated properties when patch is called', (done) => {
        let id = 2;
        let newValues = {
            value: 'CivilStatus2'
        };
        civilStatusService.patch(id, newValues).then((result: any) => {
                let updatedRow = helpers.getById(civilStatuses, id);

                expect(result).toBeDefined();
                expect(result.id).toBeDefined();
                expect(result.id).toBe(updatedRow.id);
                expect(result).toEqual(updatedRow);
                expect(result.value).toBeDefined();
                expect(result.value).toBe(updatedRow.value);
                expect(result.value).toBe(newValues.value);
                done();
            });
    });

    it('should return the removed instance by id when remove is called', (done) => {
        let id = 2;
        let item = helpers.getById(civilStatuses, id);

        civilStatusService.remove(id).then((result: any) => {
                expect(result).toBeDefined();
                expect(result).toEqual(item);
                expect(helpers.getById(civilStatuses, id)).toBeUndefined();

                done();
            });
    });
});
