import * as _ from 'lodash';
const Sequelize = require('sequelize');

import helpers from '../helpers';
const app = require('../../../src/app');
const serviceRoute = '/adm/users';

describe('User Service', () => {
    let userService: any;
    let users = [{
        id: 1,
        username: 'srodr',
        password: 'asd.123',
        salt: 'salt',
        memberId: 1
    }, {
        id: 2,
        username: 'arodr',
        password: 'asd.123',
        salt: 'salt',
        memberId: 2
    }, {
        id: 3,
        username: 'svall',
        password: 'asd.123',
        salt: 'salt',
        memberId: 3
    }];
    const userModel = app.getModel('User');

    beforeAll(() => {
        userService = app.service(serviceRoute);
        helpers.setCRUDSpies(userModel, users);
    });

    it('should be defined', () => {
        expect(userService).toBeDefined();
        expect(userService).not.toBeNull();
    });

    it('should return values when find is called', (done) => {
        userService.find()
            .then((result: any) => {
                expect(result).toBeDefined();
                expect(result.total).toBe(users.length);
                expect(result.data).toEqual(users);
                done();
            });
    });

    it('should return a value when get is called', (done) => {
        let id = 3;
        userService.get(id)
            .then((result: any) => {
                expect(result).toBeDefined();
                expect(result).toEqual(helpers.getById(users, id));
                done();
            });
    });

    it('should return a new instance when create is called', (done) => {
        let prevLength = users.length;
        let newValues = {
            username: 'avall',
            password: 'asd.123',
            salt: 'salt',
            memberId: 4
        };
        userService.create(newValues).then((result: any) => {
                expect(result).toBeDefined();
                expect(result.id).toBeDefined();
                expect(result.id).toBe(prevLength + 1);
                expect(result.username).toBeDefined();
                expect(result.username).toBe(newValues.username);
                expect(result.password).toBeDefined();
                expect(result.password).toBe(newValues.password);
                expect(result.salt).toBeDefined();
                expect(result.salt).toBe(newValues.salt);
                expect(result.memberId).toBeDefined();
                expect(result.memberId).toBe(newValues.memberId);
                expect(users.length).toBe(prevLength + 1);
                done();
            });
    });

    it('should return an updated instance (not just the properties) when update is called', (done) => {
        let id = 2;
        let newValues = {
            username: 'sauli.rodriguez'
        };
        userService.update(id, newValues).then((result: any) => {
                let updatedRow = helpers.getById(users, id);

                expect(result).toBeDefined();
                expect(result.id).toBeDefined();
                expect(result.id).toBe(updatedRow.id);
                expect(result).toEqual(updatedRow);
                expect(result.username).toBe(newValues.username);
                done();
            });
    });

    it('should return an updated an instance with its updated properties when patch is called', (done) => {
        let id = 2;
        let newValues = {
            password: 'qwe.456'
        };
        userService.patch(id, newValues).then((result: any) => {
                let updatedRow = helpers.getById(users, id);

                expect(result).toBeDefined();
                expect(result.id).toBeDefined();
                expect(result.id).toBe(updatedRow.id);
                expect(result).toEqual(updatedRow);
                expect(result.username).toBeDefined();
                expect(result.password).toBe(updatedRow.password);
                expect(result.password).toBe(newValues.password);
                done();
            });
    });

    it('should return the removed instance by id when remove is called', (done) => {
        let id = 2;
        let item = helpers.getById(users, id);

        userService.remove(id).then((result: any) => {
                expect(result).toBeDefined();
                expect(result).toEqual(item);
                expect(helpers.getById(users, id)).toBeUndefined();

                done();
            });
    });
});
