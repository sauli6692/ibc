import * as _ from 'lodash';
const Sequelize = require('sequelize');

import helpers from '../helpers';
const app = require('../../../src/app');
const serviceRoute = '/pmm/discipleships';

describe('Discipleship Service', () => {
    let discipleshipService: any;
    let discipleships = [{
        id: 1,
        name: 'Discipleship 1',
        description: 'Discipleship 1'
    }, {
        id: 2,
        name: 'Discipleship 2',
        description: 'Discipleship 2'
    }];
    const discipleshipModel = app.getModel('pmm', 'Discipleship');

    beforeAll(() => {
        discipleshipService = app.service(serviceRoute);
        helpers.setCRUDSpies(discipleshipModel, discipleships);
    });

    it('should be defined', () => {
        expect(discipleshipService).toBeDefined();
        expect(discipleshipService).not.toBeNull();
    });

    it('should return values when find is called', (done) => {
        discipleshipService.find()
            .then((result: any) => {
                expect(result).toBeDefined();
                expect(result.total).toBe(discipleships.length);
                expect(result.data).toEqual(discipleships);
                done();
            });
    });

    it('should return a value when get is called', (done) => {
        let id = 2;
        discipleshipService.get(id)
            .then((result: any) => {
                expect(result).toBeDefined();
                expect(result).toEqual(helpers.getById(discipleships, id));
                done();
            });
    });

    it('should return a new instance when create is called', (done) => {
        let prevLength = discipleships.length;
        let newValues = {
            name: 'Discipleship 3',
            description: 'Discipleship 3'
        };
        discipleshipService.create(newValues).then((result: any) => {
                expect(result).toBeDefined();
                expect(result.id).toBeDefined();
                expect(result.id).toBe(prevLength + 1);
                expect(result.name).toBeDefined();
                expect(result.name).toBe(newValues.name);
                expect(result.description).toBeDefined();
                expect(result.description).toBe(newValues.description);
                expect(discipleships.length).toBe(prevLength + 1);
                done();
            });
    });

    it('should return an updated instance (not just the properties) when update is called', (done) => {
        let id = 2;
        let newValues = {
            name: 'PMM2'
        };
        discipleshipService.update(id, newValues).then((result: any) => {
                let updatedRow = helpers.getById(discipleships, id);

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
            description: 'People management module'
        };
        discipleshipService.patch(id, newValues).then((result: any) => {
                let updatedRow = helpers.getById(discipleships, id);

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
        let item = helpers.getById(discipleships, id);

        discipleshipService.remove(id).then((result: any) => {
                expect(result).toBeDefined();
                expect(result).toEqual(item);
                expect(helpers.getById(discipleships, id)).toBeUndefined();

                done();
            });
    });
});
