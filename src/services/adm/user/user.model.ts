// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
import BaseModel from '../../../core/domain/BaseModel';

export default class User extends BaseModel {
	protected define() {
		return {
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
