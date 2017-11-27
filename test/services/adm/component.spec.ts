import * as lodash from 'lodash';
const Sequelize = require('sequelize');

const app = require('../../../src/app');
const serviceRoute = '/adm/components';

describe('Component Service', () => {
    let componentService: any;
    let components = [{
        id: 1,
        name: 'ADM',
        description: 'Administration'
    }, {
        id: 2,
        name: 'PMM',
        description: 'People management'
    }, {
        id: 3,
        name: 'MIN',
        description: 'Ministries'
    }];
    beforeAll(() => {
        const componentModel = app.getModel('Component');
        componentService = app.service(serviceRoute);
        spyOn(componentModel, 'count').and.returnValue(Promise.resolve(components.length));
        spyOn(componentModel, 'findAll').and.returnValue(Promise.resolve(components));
        spyOn(componentModel, 'findOne').and.callFake((id: number) => components[id - 1]);
    });

    it('should be defined', () => {
        expect(componentService).toBeDefined();
    });

    it('should return values when find is called', (done) => {
        componentService.find()
            .then((result: any) => {
                expect(result).toBeDefined();
                expect(result.total).toBe(components.length);
                expect(result.data).toEqual(components);
                done();
            });
    });

    it('should return a value when get is called', (done) => {
        componentService.get(1)
            .then((result: any) => {
                expect(result).toBeDefined();
                expect(result).toEqual(components[0]);
                done();
            });
    });
});
