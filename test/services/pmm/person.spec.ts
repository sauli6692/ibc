import * as _ from 'lodash';
const Sequelize = require('sequelize');

import helpers from '../helpers';
const app = require('../../../src/app');
const serviceRoute = '/pmm/people';

describe('Person Service', () => {
    let personService: any;
    let people = [{
        id: 1,
        firstname: 'Person 1',
        lastname: 'Person 1',
        birthday: new Date(),
        newBirthday: new Date(),
        baptized: true,
        integrationLevel: 1,
        gender: 'M',
        occupation: 1,
        civilStatus: 1,
        lastVisit: new Date(),
        invitedById: 1,
        directionMain: 'HN',
        directionExtra: 'TG'
    }, {
        id: 2,
        firstname: 'Person 2',
        lastname: 'Person 2',
        birthday: new Date(),
        newBirthday: new Date(),
        baptized: true,
        integrationLevel: 1,
        gender: 'M',
        occupation: 1,
        civilStatus: 1,
        lastVisit: new Date(),
        invitedById: 1,
        directionMain: 'HN',
        directionExtra: 'TG'
    }];
    const personModel = app.getModel('Person');

    beforeAll(() => {
        personService = app.service(serviceRoute);
        helpers.setCRUDSpies(personModel, people);
    });

    it('should be defined', () => {
        expect(personService).toBeDefined();
        expect(personService).not.toBeNull();
    });

    it('should return values when find is called', (done) => {
        personService.find()
            .then((result: any) => {
                expect(result).toBeDefined();
                expect(result.total).toBe(people.length);
                expect(result.data).toEqual(people);
                done();
            });
    });

    it('should return a value when get is called', (done) => {
        let id = 2;
        personService.get(id)
            .then((result: any) => {
                expect(result).toBeDefined();
                expect(result).toEqual(helpers.getById(people, id));
                done();
            });
    });

    it('should return a new instance when create is called', (done) => {
        let prevLength = people.length;
        let newValues = {
            firstname: 'Person 4',
            lastname: 'Person 4',
            birthday: new Date(),
            newBirthday: new Date(),
            baptized: true,
            integrationLevel: 1,
            gender: 'M',
            occupation: 1,
            civilStatus: 1,
            lastVisit: new Date(),
            invitedById: 1,
            directionMain: 'HN',
            directionExtra: 'TG'
        };
        personService.create(newValues).then((result: any) => {
                expect(result).toBeDefined();
                expect(result.id).toBeDefined();
                expect(result.id).toBe(prevLength + 1);
                expect(result.firstname).toBeDefined();
                expect(result.firstname).toBe(newValues.firstname);
                expect(result.lastname).toBeDefined();
                expect(result.lastname).toBe(newValues.lastname);
                expect(result.newBirthday).toBeDefined();
                expect(result.newBirthday).toBe(newValues.newBirthday);
                expect(result.baptized).toBeDefined();
                expect(result.baptized).toBe(newValues.baptized);
                expect(result.integrationLevel).toBeDefined();
                expect(result.integrationLevel).toBe(newValues.integrationLevel);
                expect(result.gender).toBeDefined();
                expect(result.gender).toBe(newValues.gender);
                expect(result.occupation).toBeDefined();
                expect(result.occupation).toBe(newValues.occupation);
                expect(result.civilStatus).toBeDefined();
                expect(result.civilStatus).toBe(newValues.civilStatus);
                expect(result.lastVisit).toBeDefined();
                expect(result.lastVisit).toBe(newValues.lastVisit);
                expect(result.invitedById).toBeDefined();
                expect(result.invitedById).toBe(newValues.invitedById);
                expect(result.directionMain).toBeDefined();
                expect(result.directionMain).toBe(newValues.directionMain);
                expect(result.directionExtra).toBeDefined();
                expect(result.directionExtra).toBe(newValues.directionExtra);
                expect(result.birthday).toBeDefined();
                expect(result.birthday).toBe(newValues.birthday);
                expect(people.length).toBe(prevLength + 1);

                done();
            });
    });

    it('should return an updated instance (not just the properties) when update is called', (done) => {
        let id = 2;
        let newValues = {
            firstname: 'Person 3'
        };
        personService.update(id, newValues).then((result: any) => {
                let updatedRow = helpers.getById(people, id);

                expect(result).toBeDefined();
                expect(result.id).toBeDefined();
                expect(result.id).toBe(updatedRow.id);
                expect(result).toEqual(updatedRow);
                expect(result.firstname).toBe(newValues.firstname);
                expect(result.lastname).toBeNull();
                expect(result.birthday).toBeNull();
                expect(result.newBirthday).toBeNull();
                expect(result.baptized).toBeNull();
                expect(result.integrationLevel).toBeNull();
                expect(result.gender).toBeNull();
                expect(result.occupation).toBeNull();
                expect(result.civilStatus).toBeNull();
                expect(result.lastVisit).toBeNull();
                expect(result.invitedById).toBeNull();
                expect(result.directionMain).toBeNull();
                expect(result.directionExtra).toBeNull();
                done();
            });
    });

    it('should return an updated an instance with its updated properties when patch is called', (done) => {
        let id = 2;
        let newValues = {
            lastname: 'Person 3'
        };
        personService.patch(id, newValues).then((result: any) => {
                let updatedRow = helpers.getById(people, id);

                expect(result).toBeDefined();
                expect(result.id).toBeDefined();
                expect(result.id).toBe(updatedRow.id);
                expect(result).toEqual(updatedRow);
                expect(result.firstname).toBe(updatedRow.firstname);
                expect(result.lastname).toBe(newValues.lastname);
                expect(result.birthday).toBe(updatedRow.birthday);
                expect(result.newBirthday).toBe(updatedRow.newBirthday);
                expect(result.baptized).toBe(updatedRow.baptized);
                expect(result.integrationLevel).toBe(updatedRow.integrationLevel);
                expect(result.gender).toBe(updatedRow.gender);
                expect(result.occupation).toBe(updatedRow.occupation);
                expect(result.civilStatus).toBe(updatedRow.civilStatus);
                expect(result.lastVisit).toBe(updatedRow.lastVisit);
                expect(result.invitedById).toBe(updatedRow.invitedById);
                expect(result.directionMain).toBe(updatedRow.directionMain);
                expect(result.directionExtra).toBe(updatedRow.directionExtra);
                done();
            });
    });

    it('should return the removed instance by id when remove is called', (done) => {
        let id = 2;
        let item = helpers.getById(people, id);

        personService.remove(id).then((result: any) => {
                expect(result).toBeDefined();
                expect(result).toEqual(item);
                expect(helpers.getById(people, id)).toBeUndefined();

                done();
            });
    });
});
