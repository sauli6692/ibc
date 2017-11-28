import * as lodash from 'lodash';
const Sequelize = require('sequelize');

import helpers from '../helpers';
const app = require('../../../src/app');
const serviceRoute = '/adm/roles';

describe('Role Service', () => {
    let roleService: any;
    let roles = [{
        id: 1,
        name: 'Root',
        description: 'Allmigth'
    }, {
        id: 2,
        name: 'Admin',
        description: 'Administrator'
    }, {
        id: 3,
        name: 'Guest',
        description: 'Guest user'
    }];
    const roleModel = app.getModel('Role');

    beforeAll(() => {
        roleService = app.service(serviceRoute);
        helpers.setCRUDSpies(roleModel, roles);
    });

    it('should be defined', () => {
        expect(roleService).toBeDefined();
        expect(roleService).not.toBeNull();
    });

    it('should return values when find is called', (done) => {
        roleService.find()
            .then((result: any) => {
                expect(result).toBeDefined();
                expect(result.total).toBe(roles.length);
                expect(result.data).toEqual(roles);
                done();
            });
    });

    it('should return a value when get is called', (done) => {
        let id = 3;
        roleService.get(id)
            .then((result: any) => {
                expect(result).toBeDefined();
                expect(result).toEqual(helpers.getById(roles, id));
                done();
            });
    });

    it('should return a new instance when create is called', (done) => {
        let prevLength = roles.length;
        let newValues = {
            name: 'Leader',
            description: 'Ministry Leader'
        };
        roleService.create(newValues).then((result: any) => {
                expect(result).toBeDefined();
                expect(result.id).toBeDefined();
                expect(result.id).toBe(prevLength + 1);
                expect(result.name).toBeDefined();
                expect(result.name).toBe(newValues.name);
                expect(result.description).toBeDefined();
                expect(result.description).toBe(newValues.description);
                expect(roles.length).toBe(prevLength + 1);
                done();
            });
    });

    it('should return an updated instance (not just the properties) when update is called', (done) => {
        let id = 2;
        let newValues = {
            name: 'Leader 2'
        };
        roleService.update(id, newValues).then((result: any) => {
                let updatedRow = helpers.getById(roles, id);

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
            description: 'Leader'
        };
        roleService.patch(id, newValues).then((result: any) => {
                let updatedRow = helpers.getById(roles, id);

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
        let item = helpers.getById(roles, id);

        roleService.remove(id).then((result: any) => {
                expect(result).toBeDefined();
                expect(result).toEqual(item);
                expect(helpers.getById(roles, id)).toBeUndefined();

                done();
            });
    });
});
