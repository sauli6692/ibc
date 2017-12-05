import * as lodash from 'lodash';
const Sequelize = require('sequelize');

import helpers from '../helpers';
const app = require('../../../src/app');
const serviceRoute = '/pmm/lessons';

describe('Lesson Service', () => {
    let lessonService: any;
    let lessons = [{
        id: 1,
        name: 'Lesson 1',
        description: 'Lesson 1',
        discipleshipId: 1
    }, {
        id: 2,
        name: 'Lesson 2',
        description: 'Lesson 2',
        discipleshipId: 1
    }];
    const lessonModel = app.getModel('Lesson');

    beforeAll(() => {
        lessonService = app.service(serviceRoute);
        helpers.setCRUDSpies(lessonModel, lessons);
    });

    it('should be defined', () => {
        expect(lessonService).toBeDefined();
        expect(lessonService).not.toBeNull();
    });

    it('should return values when find is called', (done) => {
        lessonService.find()
            .then((result: any) => {
                expect(result).toBeDefined();
                expect(result.total).toBe(lessons.length);
                expect(result.data).toEqual(lessons);
                done();
            });
    });

    it('should return a value when get is called', (done) => {
        let id = 2;
        lessonService.get(id)
            .then((result: any) => {
                expect(result).toBeDefined();
                expect(result).toEqual(helpers.getById(lessons, id));
                done();
            });
    });

    it('should return a new instance when create is called', (done) => {
        let prevLength = lessons.length;
        let newValues = {
            name: 'Lesson 4',
            description: 'Lesson 4',
            discipleshipId: 1
        };
        lessonService.create(newValues).then((result: any) => {
                expect(result).toBeDefined();
                expect(result.id).toBeDefined();
                expect(result.id).toBe(prevLength + 1);
                expect(result.name).toBeDefined();
                expect(result.name).toBe(newValues.name);
                expect(result.description).toBeDefined();
                expect(result.description).toBe(newValues.description);
                expect(lessons.length).toBe(prevLength + 1);
                done();
            });
    });

    it('should return an updated instance (not just the properties) when update is called', (done) => {
        let id = 2;
        let newValues = {
            name: 'Lesson 3'
        };
        lessonService.update(id, newValues).then((result: any) => {
                let updatedRow = helpers.getById(lessons, id);

                expect(result).toBeDefined();
                expect(result.id).toBeDefined();
                expect(result.id).toBe(updatedRow.id);
                expect(result).toEqual(updatedRow);
                expect(result.name).toBe(newValues.name);
                expect(result.description).toBeNull();
                expect(result.discipleshipId).toBeNull();
                done();
            });
    });

    it('should return an updated an instance with its updated properties when patch is called', (done) => {
        let id = 2;
        let newValues = {
            description: 'Lesson 3'
        };
        lessonService.patch(id, newValues).then((result: any) => {
                let updatedRow = helpers.getById(lessons, id);

                expect(result).toBeDefined();
                expect(result.id).toBeDefined();
                expect(result.id).toBe(updatedRow.id);
                expect(result).toEqual(updatedRow);
                expect(result.name).toBeDefined();
                expect(result.name).toBe(updatedRow.name);
                expect(result.discipleshipId).toBeDefined();
                expect(result.discipleshipId).toBe(updatedRow.discipleshipId);
                expect(result.description).toBe(newValues.description);
                done();
            });
    });

    it('should return the removed instance by id when remove is called', (done) => {
        let id = 2;
        let item = helpers.getById(lessons, id);

        lessonService.remove(id).then((result: any) => {
                expect(result).toBeDefined();
                expect(result).toEqual(item);
                expect(helpers.getById(lessons, id)).toBeUndefined();

                done();
            });
    });
});
