import * as _ from 'lodash';
const Sequelize = require('sequelize');

import { BaseModel } from '../../../../src/core/domain/models';
const app = require('../../../../src/app');

const component = 'test';

describe('BaseModel', () => {
    let newModel: any;
    let modelDefinition = {
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
    let associations = {
        oneToOne: [{
            model: 'Model',
            as: 'model'
        }]
    };

    class Model extends BaseModel {
        protected define() {
            return modelDefinition;
        }

        protected setAssociations() {
            return associations;
        }
    }

    beforeAll(() => {
        newModel = new Model(component, app);
    });

    it('should be implemented with all its public members', () => {
        expect(newModel.app).toBe(app);
        expect(newModel.component).toBe(component);
        expect(newModel.identity).toBe(`${component}_${newModel.name}`.toUpperCase());
        expect(newModel.name).toBe(modelDefinition.name);
        expect(newModel.associations).toBeDefined();
        expect(newModel.fields).toBeDefined();
        expect(newModel.getSequelizeModel).toBeDefined();
        expect(newModel.options).toBeDefined();
        expect(newModel.sequelizeClient).toBeDefined();
    });

    it('should have an associations property', () => {
        expect(newModel.associations).toEqual(associations);
    });

    it('should have a fields property', () => {
        expect(newModel.fields).toEqual(modelDefinition.fields);
    });

    it('should instantiate a Sequelize Model', () => {
        let sequelizeModel = newModel.getSequelizeModel();

        expect(sequelizeModel).toBeDefined();
        expect(sequelizeModel.prototype instanceof Sequelize.Model).toBe(true);
    });

    it('should have an options property with default values', () => {
        let options = newModel.options;
        let optionsProperties = _.keys(options);

        expect(options.freezeTableName).toBeDefined();
        expect(options.freezeTableName).toBe(true);

        expect(options.tableName).toBeDefined();
        expect(options.tableName).toBe(newModel.identity);

        expect(options.modelName).toBeDefined();
        expect(options.modelName).toBe(newModel.name);

        expect(options.sequelize).toBeDefined();
        expect(options.sequelize instanceof Sequelize).toBe(true);
    });

    it('should have a sequelizeClient property', () => {
        expect(newModel.sequelizeClient instanceof Sequelize).toBe(true);
    });
});
