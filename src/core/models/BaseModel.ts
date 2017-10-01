const Sequelize = require('sequelize');

export default abstract class BaseModel {
	private _name: string;
	private _sequelizeClient: any;
	private _fields: any;
	private _options: any;
	private _associations: Function;
	private _model: any;
	private _app: any;

	constructor(app: any) {
		this._app = app;
		this.sequelizeClient = this._app.get('sequelizeClient');
		this.fields = this.setFields();
		this.options = this.setOptions();
		this.associations = this.setAssociations();
		this.createModel();
	}

	get name(): any {
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

	set name(name: string) {
		this._name = name;
	}
	set sequelizeClient(sequelizeClient: any) {
		this._sequelizeClient = sequelizeClient;
	}
	set fields(): any {
		this._fields = fields;
	}
	set options(): any {
		this._options = options;
	}
	set associations(): any {
		this._associations = associations;
	}

	public createModel() {
		this._model = this.sequelizeClient.define(this.name, this.definition, this.options);

		this._model.associate = this.associations || ((models: any[]) => {});
	}

	public getSequelizeModel(): any {
		return this._model;
	}

	private abstract setFields(): any;
	private abstract setOptions(): any;
	private abstract setAssociations(): Function {
		return (models: any[]) => { // eslint-disable-line no-unused-vars
			// Define associations here
			// See http://docs.sequelizejs.com/en/latest/docs/associations/
		};
	}
}
