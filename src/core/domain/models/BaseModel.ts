import * as _ from 'lodash';
const Sequelize = require('sequelize');

import { IAssociation, IAssociationOption } from './IAssociation';
import { logger } from '../../utils/logger';

export abstract class BaseModel {
	private _component: string;
	private _name: string;
	private _sequelizeClient: any;
	private _fields: any;
	private _options: any;
	private _associations: IAssociation;
	private _model: any;
	private _app: any;

	constructor(component: string, app: any) {
        let definition = this.define();

		this._app = app;
		this._component = component;
		this._name = _.upperFirst(_.camelCase(definition.name));
		this._fields = definition.fields;
		this.options = this.setOptions();
		this._associations = this.setAssociations();
		this._sequelizeClient = this._app.get('sequelizeClient');

        let models = this._app.get('models');
        if (_.isNil(models)) {
            models = {};
            this._app.set('models', models);
        }

        if (_.isNil(models[this._component])) {
            models[this._component] = {};
        }
        if (_.isNil(models[this._component][this._name])) {
            models[this._component][this._name] = this;
        }

		this.createModel();
	}

    get app(): any {
        return this._app;
    }
	get component(): string {
		return this._component;
	}
	get name(): string {
		return this._name;
	}
	get sequelizeClient(): any {
		return this._sequelizeClient;
	}
	get fields(): any {
		return this._fields;
	}
    get fieldsNames(): any {
		return _.keys(this._fields);
	}
	get options(): any {
		return this._options;
	}
	get associations(): any {
		return this._associations;
	}
	get identity(): string {
		return this.component.toUpperCase() + '_' + _.snakeCase(this.name).toUpperCase();
	}

	set options(options: any) {
		options.freezeTableName = _.isNil(options.freezeTableName) || options.freezeTableName;
		options.tableName = options.tableName || this.identity;
		this._options = options;
	}

    public getSequelizeModel(): any {
		return this._model;
	}

	protected abstract define(): { name: string, fields: any };

	protected setOptions(): any {
		return {};
	}

	protected setAssociations(): IAssociation {
		return {};
	}

    private createModel() {
        _.forOwn(this.fields, (fieldDefinition: any, key: string) => {
            fieldDefinition.field = _.snakeCase(key);
        });

        this._model = this.sequelizeClient
            .define(_.lowerCase(this._component) + this.name, this.fields, this.options);

        this._model.associate = this.getAssosiationsSetup();
    }

	private getAssosiationsSetup(): Function {
        let setupHasAssociations = (functionName: string, models: any) => {
            return (options: IAssociationOption) => {
                let component = _.lowerCase(options.component || this.component);
                let modelName = options.model;
                let isSource = !_.isNil(options.source) && options.source;
				let model = models[component + modelName] || component + modelName;
                delete options.model;
                delete options.source;
                delete options.component;

				if (isSource) {
                    options.foreignKey = options.foreignKey || _.camelCase(this.name) + 'Id';
					this._model[functionName](model, options);
				} else {
                    options.foreignKey = options.foreignKey || _.camelCase(modelName) + 'Id';
					this._model.belongsTo(model, options);
				}
            };
        };

		return (models: any) => {
			if (!_.isNil(this.associations.oneToOne)) {
				_.forEach(this.associations.oneToOne, setupHasAssociations('hasOne', models));
			}

			if (!_.isNil(this.associations.oneToMany)) {
				_.forEach(this.associations.oneToMany, setupHasAssociations('hasMany', models));
			}

			if (!_.isNil(this.associations.manyToMany)) {
				_.forEach(this.associations.manyToMany, (options: IAssociationOption) => {
					let component = _.lowerCase(options.component || this.component);
					let model = component + options.model;

                    delete options.model;
                    delete options.component;
					options.foreignKey = options.foreignKey || _.camelCase(this.name) + 'Id';
					this._model.belongsToMany(models[model], options);
				});
			}
		};
	}
}
