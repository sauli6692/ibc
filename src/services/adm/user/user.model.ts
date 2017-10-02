// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
import BaseModel from '../../../core/models/BaseModel';
import IModelDefinition from '../../../core/models/IModelDefinition';

export default class User extends BaseModel {
	protected define(): IModelDefinition {
		return {
			module: 'adm',
			name: 'user',
			fields: {
				email: {
					type: Sequelize.STRING,
					allowNull: true,
					unique: true
				},
				password: {
					type: Sequelize.STRING,
					allowNull: true
				}
			}
		};
	}
}
