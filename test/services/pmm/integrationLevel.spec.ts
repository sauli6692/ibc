import * as _ from 'lodash';
const Sequelize = require('sequelize');

import helpers from '../helpers';
const app = require('../../../src/app');
const serviceRoute = '/pmm/integration-levels';

describe('Integration Level Service', () => {
    let integrationLevelService: any;
    let integrationLevels = [{
        id: 1,
        value: 'Integrated'
    }, {
        id: 2,
        value: 'Visit'
    }, {
        id: 3,
        value: 'Not integrated'
    }];
    const integrationLevelModel = app.getModel('IntegrationLevel');

    beforeAll(() => {
        integrationLevelService = app.service(serviceRoute);
        helpers.setCRUDSpies(integrationLevelModel, integrationLevels);
    });

    it('should be defined', () => {
        expect(integrationLevelService).toBeDefined();
        expect(integrationLevelService).not.toBeNull();
    });

    it('should return values when find is called', (done) => {
        integrationLevelService.find()
            .then((result: any) => {
                expect(result).toBeDefined();
                expect(result.total).toBe(integrationLevels.length);
                expect(result.data).toEqual(integrationLevels);
                done();
            });
    });

    it('should return a value when get is called', (done) => {
        let id = 3;
        integrationLevelService.get(id)
            .then((result: any) => {
                expect(result).toBeDefined();
                expect(result).toEqual(helpers.getById(integrationLevels, id));
                done();
            });
    });

    it('should return a new instance when create is called', (done) => {
        let prevLength = integrationLevels.length;
        let newValues = {
            value: 'Person'
        };
        integrationLevelService.create(newValues).then((result: any) => {
                expect(result).toBeDefined();
                expect(result.id).toBeDefined();
                expect(result.id).toBe(prevLength + 1);
                expect(result.value).toBeDefined();
                expect(result.value).toBe(newValues.value);
                expect(integrationLevels.length).toBe(prevLength + 1);
                done();
            });
    });

    it('should return an updated instance (not just the properties) when update is called', (done) => {
        let id = 2;
        let newValues = {
            value: 'IntegrationLevel1'
        };
        integrationLevelService.update(id, newValues).then((result: any) => {
                let updatedRow = helpers.getById(integrationLevels, id);

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
            value: 'IntegrationLevel2'
        };
        integrationLevelService.patch(id, newValues).then((result: any) => {
                let updatedRow = helpers.getById(integrationLevels, id);

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
        let item = helpers.getById(integrationLevels, id);

        integrationLevelService.remove(id).then((result: any) => {
                expect(result).toBeDefined();
                expect(result).toEqual(item);
                expect(helpers.getById(integrationLevels, id)).toBeUndefined();

                done();
            });
    });
});
