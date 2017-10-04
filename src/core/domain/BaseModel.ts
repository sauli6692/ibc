import * as lodash from 'lodash';
const Sequelize = require('sequelize');

export default abstract class BaseModel {
	private _component: string;
	private _name: string;
	private _sequelizeClient: any;
	private _fields: any;
	private _options: any;
	private _associations: Function;
	private _model: any;
	private _app: any;

	constructor(component: string, app: any) {
        let definition = this.define();

		this._app = app;
		this._component = component;
		this._name = definition.name;
		this._fields = definition.fields;
		this.options = this.setOptions();
		this._associations = this.setAssociations();
		this._sequelizeClient = this._app.get('sequelizeClient');

		this.createModel();
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
		return this.component.toUpperCase() + '_' + this.name.toUpperCase();
	}

	set options(options: any) {
		options.freezeTableName = lodash.isNil(options.freezeTableName) || options.freezeTableName;
		options.tableName = options.tableName || this.identity;
		this._options = options;
	}

    public getSequelizeModel(): any {
		return this._model;
	}

	private createModel() {
		this._model = this.sequelizeClient
			.define(this.name, this.fields, this.options);

		this._model.associate = this.associations;
	}

	protected abstract define(): { name: string, fields: any };

	protected setOptions(): any {
		return {};
	}

	protected setAssociations(): Function {
		return (models: any[]) => { // eslint-disable-line no-unused-vars
			// Define associations here
			// See http://docs.sequelizejs.com/en/latest/docs/associations/
		};
	}
}
