import * as _ from 'lodash';
const Sequelize = require('sequelize');

import helpers from '../helpers';
const app = require('../../../src/app');
const serviceRoute = '/pmm/occupations';

describe('Occupation Service', () => {
    let occupationService: any;
    let occupations = [{
        id: 1,
        value: 'Employee'
    }, {
        id: 2,
        value: 'Student'
    }, {
        id: 3,
        value: 'Unemployee'
    }];
    const occupationModel = app.getModel('pmm', 'Occupation');

    beforeAll(() => {
        occupationService = app.service(serviceRoute);
        helpers.setCRUDSpies(occupationModel, occupations);
    });

    it('should be defined', () => {
        expect(occupationService).toBeDefined();
        expect(occupationService).not.toBeNull();
    });

    it('should return values when find is called', (done) => {
        occupationService.find()
            .then((result: any) => {
                expect(result).toBeDefined();
                expect(result.total).toBe(occupations.length);
                expect(result.data).toEqual(occupations);
                done();
            });
    });

    it('should return a value when get is called', (done) => {
        let id = 3;
        occupationService.get(id)
            .then((result: any) => {
                expect(result).toBeDefined();
                expect(result).toEqual(helpers.getById(occupations, id));
                done();
            });
    });

    it('should return a new instance when create is called', (done) => {
        let prevLength = occupations.length;
        let newValues = {
            value: 'Person'
        };
        occupationService.create(newValues).then((result: any) => {
                expect(result).toBeDefined();
                expect(result.id).toBeDefined();
                expect(result.id).toBe(prevLength + 1);
                expect(result.value).toBeDefined();
                expect(result.value).toBe(newValues.value);
                expect(occupations.length).toBe(prevLength + 1);
                done();
            });
    });

    it('should return an updated instance (not just the properties) when update is called', (done) => {
        let id = 2;
        let newValues = {
            value: 'Occupation1'
        };
        occupationService.update(id, newValues).then((result: any) => {
                let updatedRow = helpers.getById(occupations, id);

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
            value: 'Occupation2'
        };
        occupationService.patch(id, newValues).then((result: any) => {
                let updatedRow = helpers.getById(occupations, id);

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
        let item = helpers.getById(occupations, id);

        occupationService.remove(id).then((result: any) => {
                expect(result).toBeDefined();
                expect(result).toEqual(item);
                expect(helpers.getById(occupations, id)).toBeUndefined();

                done();
            });
    });
});
