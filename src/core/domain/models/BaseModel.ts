import * as lodash from 'lodash';
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
		this._name = lodash.upperFirst(lodash.camelCase(definition.name));
		this._fields = definition.fields;
		this.options = this.setOptions();
		this._associations = this.setAssociations();
		this._sequelizeClient = this._app.get('sequelizeClient');

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
	get options(): any {
		return this._options;
	}
	get associations(): any {
		return this._associations;
	}
	get identity(): string {
		return this.component.toUpperCase() + '_' + lodash.snakeCase(this.name).toUpperCase();
	}

	set options(options: any) {
		options.freezeTableName = lodash.isNil(options.freezeTableName) || options.freezeTableName;
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
        lodash.forOwn(this.fields, (fieldDefinition: any, key: string) => {
            fieldDefinition.field = lodash.snakeCase(key);
        });

        this._model = this.sequelizeClient
            .define(this.name, this.fields, this.options);

        this._model.associate = this.getAssosiationsSetup();
    }

	private getAssosiationsSetup(): Function {
        let setupHasAssociations = (functionName: string, models: any) => {
            return (options: IAssociationOption) => {
                let modelName = options.model;
                let isSource = !lodash.isNil(options.source) && options.source;
				let model = models[modelName] || modelName;
                delete options.model;
                delete options.source;

				if (isSource) {
					this._model[functionName](model, options);
				} else {
					this._model.belongsTo(model, options);
				}
            };
        };

		return (models: any) => {
			if (!lodash.isNil(this.associations.oneToOne)) {
				lodash.forEach(this.associations.oneToOne, setupHasAssociations('hasOne', models));
			}

			if (!lodash.isNil(this.associations.oneToMany)) {
				lodash.forEach(this.associations.oneToMany, setupHasAssociations('hasMany', models));
			}

			if (!lodash.isNil(this.associations.manyToMany)) {
				lodash.forEach(this.associations.manyToMany, (options: IAssociationOption) => {
					let model = options.model;
                    delete options.model;
					options.foreignKey = options.foreignKey || lodash.camelCase(this.name) + 'Id';
					this._model.belongsToMany(models[model], options);
				});
			}
		};
	}
}
