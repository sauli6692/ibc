import * as _ from 'lodash';
const Sequelize = require('sequelize');

import helpers from '../helpers';
const app = require('../../../src/app');
const serviceRoute = '/min/ministry-objectives';

describe('Ministry Objective Service', () => {
    let ministryObjectivesService: any;
    let ministryObjectives = [{
        id: 1,
        objective: 'Routes',
        ministryId: 1
    }, {
        id: 2,
        objective: 'Administration',
        ministryId: 2
    }, {
        id: 3,
        objective: 'Ladies',
        ministryId: 3
    }];

    beforeAll(() => {
        const ministryObjectivesModel = app.getModel('min', 'MinistryObjective');

        ministryObjectivesService = app.service(serviceRoute);
        helpers.setCRUDSpies(ministryObjectivesModel, ministryObjectives);
    });

    it('should be defined', () => {
        expect(ministryObjectivesService).toBeDefined();
        expect(ministryObjectivesService).not.toBeNull();
    });

    it('should return values when find is called', (done) => {
        ministryObjectivesService.find()
            .then((result: any) => {
                expect(result).toBeDefined();
                expect(result.total).toBe(ministryObjectives.length);
                expect(result.data).toEqual(ministryObjectives);
                done();
            });
    });

    it('should return a value when get is called', (done) => {
        let id = 3;
        ministryObjectivesService.get(id)
            .then((result: any) => {
                expect(result).toBeDefined();
                expect(result).toEqual(helpers.getById(ministryObjectives, id));
                done();
            });
    });

    it('should return a new instance when create is called', (done) => {
        let prevLength = ministryObjectives.length;
        let newValues = {
            objective: 'Pray',
            ministryId: 1
        };
        ministryObjectivesService.create(newValues).then((result: any) => {
                expect(result).toBeDefined();
                expect(result.id).toBeDefined();
                expect(result.id).toBe(prevLength + 1);
                expect(result.objective).toBeDefined();
                expect(result.objective).toBe(newValues.objective);
                expect(result.ministryId).toBeDefined();
                expect(result.ministryId).toBe(newValues.ministryId);
                expect(ministryObjectives.length).toBe(prevLength + 1);
                done();
            });
    });

    it('should return an updated instance (not just the properties) when update is called', (done) => {
        let id = 2;
        let newValues = {
            objective: 'Administration2'
        };
        ministryObjectivesService.update(id, newValues).then((result: any) => {
                let updatedRow = helpers.getById(ministryObjectives, id);

                expect(result).toBeDefined();
                expect(result.id).toBeDefined();
                expect(result.id).toBe(updatedRow.id);
                expect(result).toEqual(updatedRow);
                expect(result.objective).toBe(newValues.objective);
                expect(result.ministryId).toBeNull();
                done();
            });
    });

    it('should return an updated an instance with its updated properties when patch is called', (done) => {
        let id = 2;
        let newValues = {
            ministryId: 1
        };
        ministryObjectivesService.patch(id, newValues).then((result: any) => {
                let updatedRow = helpers.getById(ministryObjectives, id);

                expect(result).toBeDefined();
                expect(result.id).toBeDefined();
                expect(result.id).toBe(updatedRow.id);
                expect(result).toEqual(updatedRow);
                expect(result.objective).toBeDefined();
                expect(result.objective).toBe(updatedRow.objective);
                expect(result.ministryId).toBe(newValues.ministryId);
                done();
            });
    });

    it('should return the removed instance by id when remove is called', (done) => {
        let id = 2;
        let item = helpers.getById(ministryObjectives, id);

        ministryObjectivesService.remove(id).then((result: any) => {
                expect(result).toBeDefined();
                expect(result).toEqual(item);
                expect(helpers.getById(ministryObjectives, id)).toBeUndefined();

                done();
            });
    });
});
