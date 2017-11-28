import * as lodash from 'lodash';
const Sequelize = require('sequelize');

import helpers from '../helpers';
const app = require('../../../src/app');
const serviceRoute = '/adm/models';

describe('Model Service', () => {
    let modelService: any;
    let models = [{
        id: 1,
        name: 'Component'
    }, {
        id: 2,
        name: 'Model'
    }, {
        id: 3,
        name: 'User'
    }];
    const modelModel = app.getModel('Model');

    beforeAll(() => {
        modelService = app.service(serviceRoute);
        helpers.setCRUDSpies(modelModel, models);
    });

    it('should be defined', () => {
        expect(modelService).toBeDefined();
        expect(modelService).not.toBeNull();
    });

    it('should return values when find is called', (done) => {
        modelService.find()
            .then((result: any) => {
                expect(result).toBeDefined();
                expect(result.total).toBe(models.length);
                expect(result.data).toEqual(models);
                done();
            });
    });

    it('should return a value when get is called', (done) => {
        let id = 3;
        modelService.get(id)
            .then((result: any) => {
                expect(result).toBeDefined();
                expect(result).toEqual(helpers.getById(models, id));
                done();
            });
    });

    it('should return a new instance when create is called', (done) => {
        let prevLength = models.length;
        let newValues = {
            name: 'Person'
        };
        modelService.create(newValues).then((result: any) => {
                expect(result).toBeDefined();
                expect(result.id).toBeDefined();
                expect(result.id).toBe(prevLength + 1);
                expect(result.name).toBeDefined();
                expect(result.name).toBe(newValues.name);
                expect(models.length).toBe(prevLength + 1);
                done();
            });
    });

    it('should return an updated instance (not just the properties) when update is called', (done) => {
        let id = 2;
        let newValues = {
            name: 'Model1'
        };
        modelService.update(id, newValues).then((result: any) => {
                let updatedRow = helpers.getById(models, id);

                expect(result).toBeDefined();
                expect(result.id).toBeDefined();
                expect(result.id).toBe(updatedRow.id);
                expect(result).toEqual(updatedRow);
                expect(result.name).toBe(newValues.name);
                done();
            });
    });

    it('should return an updated an instance with its updated properties when patch is called', (done) => {
        let id = 2;
        let newValues = {
            name: 'Model2'
        };
        modelService.patch(id, newValues).then((result: any) => {
                let updatedRow = helpers.getById(models, id);

                expect(result).toBeDefined();
                expect(result.id).toBeDefined();
                expect(result.id).toBe(updatedRow.id);
                expect(result).toEqual(updatedRow);
                expect(result.name).toBeDefined();
                expect(result.name).toBe(updatedRow.name);
                expect(result.name).toBe(newValues.name);
                done();
            });
    });

    it('should return the removed instance by id when remove is called', (done) => {
        let id = 2;
        let item = helpers.getById(models, id);

        modelService.remove(id).then((result: any) => {
                expect(result).toBeDefined();
                expect(result).toEqual(item);
                expect(helpers.getById(models, id)).toBeUndefined();

                done();
            });
    });
});
