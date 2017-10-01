// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
import BaseModel from '../../core/models/BaseModel';

const fields: Object = {
	email: {
		type: Sequelize.STRING,
		allowNull: true,
		unique: true
	},
	password: {
		type: Sequelize.STRING,
		allowNull: true
	},
};

const options = {
	hooks: {
		beforeCount(options: any) {
			options.raw = true;
		}
	}
};

const associations = (models: any[]) => { // eslint-disable-line no-unused-vars
	// Define associations here
	// See http://docs.sequelizejs.com/en/latest/docs/associations/
};

const model = (app: any) => {
	let baseModel = new BaseModel(app);

	return baseModel.define('user', fields, options, associations);
};

export default model;
