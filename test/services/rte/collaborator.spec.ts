import * as _ from 'lodash';
const Sequelize = require('sequelize');

import helpers from '../helpers';
const app = require('../../../src/app');
const serviceRoute = '/rte/collaborators';
const collaboratorIdField = 'memberId';
describe('Collaborators Service', () => {
    let collaboratorService: any;
    let collaborators = [{
        memberId: 1,
        routeId: 1,
        ministryId: 1,
        routeLeader: 0
    }, {
        memberId: 2,
        routeId: 1,
        ministryId: 1,
        routeLeader: 0
    }, {
        memberId: 3,
        routeId: 2,
        ministryId: 1,
        routeLeader: 1
    }];
    const collaboratorModel = app.getModel('rte', 'Collaborator');

    beforeAll(() => {
        collaboratorService = app.service(serviceRoute);
        helpers.setCRUDSpies(collaboratorModel, collaborators, collaboratorIdField);
    });

    it('should be defined', () => {
        expect(collaboratorService).toBeDefined();
        expect(collaboratorService).not.toBeNull();
    });

    it('should return values when find is called', (done) => {
        collaboratorService.find()
            .then((result: any) => {
                expect(result).toBeDefined();
                expect(result.total).toBe(collaborators.length);
                expect(result.data).toEqual(collaborators);
                done();
            });
    });

    it('should return a value when get is called', (done) => {
        let id = 3;
        collaboratorService.get(id)
            .then((result: any) => {
                console.log(result);
                expect(result).toBeDefined();
                expect(result).toEqual(helpers.getById(collaborators, id, collaboratorIdField));
                done();
            });
    });

    it('should return a new instance when create is called', (done) => {
        let prevLength = collaborators.length;
        let newValues = {
            memberId: 1,
            routeId: 1,
            routeLeader: 0
        };
        collaboratorService.create(newValues).then((result: any) => {
                expect(result).toBeDefined();
                expect(result.memberId).toBe(newValues.memberId);
                expect(result.routeId).toBe(newValues.routeId);
                expect(result.routeLeader === 1).toBeFalsy();
                expect(result.ministryId).toBeUndefined();
                done();
            });
    });

    it('should return an updated instance (not just the properties) when update is called', (done) => {
        let id = 2;
        let newValues = {
            ministryId: 2
        };
        collaboratorService.update(id, newValues).then((result: any) => {
                let updatedRow = helpers.getById(collaborators, id, collaboratorIdField);
                updatedRow.memberId = id;

                expect(result).toBeDefined();
                expect(result.routeLeader).toBeNull();
                expect(result.routeId).toBeNull();
                expect(result.ministryId).toBe(newValues.ministryId);
                done();
            });
    });

    it('should return an updated an instance with its updated properties when patch is called', (done) => {
        let id = 2;
        let newValues = {
            ministryId: 3
        };

        collaboratorService.patch(id, newValues).then((result: any) => {
                let updatedRow = helpers.getById(collaborators, id, collaboratorIdField);

                expect(result).toBeDefined();
                expect(result).toEqual(updatedRow);
                expect(result.ministryId).toBe(updatedRow.ministryId);
                expect(result.ministryId).toBe(newValues.ministryId);
                expect(result.memberId).toBe(updatedRow.memberId);
                expect(result.routeId).toBe(updatedRow.routeId);
                expect(result.routeLeader).toBe(updatedRow.routeLeader);
                done();
            });
    });

    it('should return the removed instance by id when remove is called', (done) => {
        let id = 2;
        let item = helpers.getById(collaborators, id, collaboratorIdField);

        collaboratorService.remove(id).then((result: any) => {
                expect(result).toBeDefined();
                expect(result).toEqual(item);
                expect(helpers.getById(collaborators, id, collaboratorIdField)).toBeUndefined();

                done();
            });
    });
});
