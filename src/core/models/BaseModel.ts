const Sequelize = require('sequelize');

export default abstract class BaseModel {
	private sequelizeClient: any;
	constructor(app: any) {
		this.sequelizeClient = app.get('sequelizeClient');
	}

	define(name: string, definition: any, options?: any, associations?: Function) {
		const model = this.sequelizeClient.define(name, definition, options);

		model.associate = associations || ((models: any[]) => {});

		return model;
	}
}
