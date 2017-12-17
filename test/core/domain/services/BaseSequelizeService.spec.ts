import * as _ from 'lodash';

import { BaseSequelizeService } from '../../../../src/core/domain/services';
import { PredefinedHooks } from '../../../../src/core/domain/services/PredefinedHooks';
import { BaseModel } from '../../../../src/core/domain/models';
const app = require('../../../../src/app');

const component = 'test';
describe('BaseSequelizeService', () => {
    let testService: BaseSequelizeService;
    class Model extends BaseModel {
        protected define() {
            return {
                name: 'Model',
                fields: {
                    id: {
                        type: 'number',
                        primaryKey: true
                    },
                    name: {
                        type: 'string'
                    }
                }
            };
        }
    }

    const serviceDefinition = {
        route: 'test',
        model: Model,
        schemas: {
            create: {
                type: 'object'
            },
            update: {
                type: 'object'
            }
        }
    };
    class TestService extends BaseSequelizeService {
        protected define() {
            return serviceDefinition;
        }
    }

    beforeAll(() => {
        testService = new TestService(component, app);
    });

    it('should be implemented with all its public members', () => {
        expect(testService.afterInit).toBeDefined();
        expect(testService.app).toEqual(app);
        expect(testService.component).toBe(component);

        expect(testService.createService).toBeDefined();
        expect(testService.createService instanceof Function).toBe(true);

        expect(testService.filters).toBeDefined();
        expect(testService.filters).toBeNull();

        expect(testService.hooks).toBeDefined();
        expect(testService.hooks.before).toBeDefined();
        expect(testService.hooks.after).toBeDefined();
        expect(testService.hooks.error).toBeDefined();

        expect(testService.model).toBeDefined();
        expect(testService.model instanceof Model).toBe(true);

        expect(testService.route).toBe(serviceDefinition.route);
        expect(testService.schemas).toBeDefined();
        expect(testService.schemas).toEqual({
            create: {
                type: 'object'
            },
            update: {
                type: 'object'
            }
        });

        expect(testService.servicePath).toBe(`/${component}/${serviceDefinition.route}`);
    });
});
