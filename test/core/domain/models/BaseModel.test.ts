import { BaseModel } from '../../../../src/core/domain/models/index';
import * as lodash from 'lodash';

const app = require('../../../../src/app');

class Model extends BaseModel {
    define() {
        return {
            name: 'Model',
            fields: {}
        };
    }
}

describe('BaseModel', () => {
    it('should be implemented with all its members', () => {
        let newModel = new Model('test', app);

        expect(newModel.app).toBe(app);
        expect(newModel.component).toBe('test');
        expect(newModel.identity).toBe('TEST_MODEL');
        expect(newModel.define).toBeDefined();
        expect(newModel.associations).toBeDefined();
        expect(newModel.fields).toBeDefined();
        expect(newModel.getSequelizeModel).toBeDefined();
        expect(newModel.name).toBe('Model');
        expect(newModel.options).toBeDefined();
        expect(newModel.sequelizeClient).toBeDefined();
    });
});
