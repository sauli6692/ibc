import * as _ from 'lodash';
const Sequelize = require('sequelize');

import helpers from '../helpers';
const app = require('../../../src/app');
const serviceRoute = '/pmm/family-relationships';

describe('Family Relationship Service', () => {
    let familyRelationshipService: any;
    let familyRelationships = [{
        id: 1,
        value: 'Mom'
    }, {
        id: 2,
        value: 'Dad'
    }, {
        id: 3,
        value: 'Son'
    }];
    const familyRelationshipModel = app.getModel('FamilyRelationship');

    beforeAll(() => {
        familyRelationshipService = app.service(serviceRoute);
        helpers.setCRUDSpies(familyRelationshipModel, familyRelationships);
    });

    it('should be defined', () => {
        expect(familyRelationshipService).toBeDefined();
        expect(familyRelationshipService).not.toBeNull();
    });

    it('should return values when find is called', (done) => {
        familyRelationshipService.find()
            .then((result: any) => {
                expect(result).toBeDefined();
                expect(result.total).toBe(familyRelationships.length);
                expect(result.data).toEqual(familyRelationships);
                done();
            });
    });

    it('should return a value when get is called', (done) => {
        let id = 3;
        familyRelationshipService.get(id)
            .then((result: any) => {
                expect(result).toBeDefined();
                expect(result).toEqual(helpers.getById(familyRelationships, id));
                done();
            });
    });

    it('should return a new instance when create is called', (done) => {
        let prevLength = familyRelationships.length;
        let newValues = {
            value: 'Person'
        };
        familyRelationshipService.create(newValues).then((result: any) => {
                expect(result).toBeDefined();
                expect(result.id).toBeDefined();
                expect(result.id).toBe(prevLength + 1);
                expect(result.value).toBeDefined();
                expect(result.value).toBe(newValues.value);
                expect(familyRelationships.length).toBe(prevLength + 1);
                done();
            });
    });

    it('should return an updated instance (not just the properties) when update is called', (done) => {
        let id = 2;
        let newValues = {
            value: 'Family Relationship1'
        };
        familyRelationshipService.update(id, newValues).then((result: any) => {
                let updatedRow = helpers.getById(familyRelationships, id);

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
            value: 'Family Relationship2'
        };
        familyRelationshipService.patch(id, newValues).then((result: any) => {
                let updatedRow = helpers.getById(familyRelationships, id);

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
        let item = helpers.getById(familyRelationships, id);

        familyRelationshipService.remove(id).then((result: any) => {
                expect(result).toBeDefined();
                expect(result).toEqual(item);
                expect(helpers.getById(familyRelationships, id)).toBeUndefined();

                done();
            });
    });
});
