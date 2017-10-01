// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
import BaseModel from '../../../../core/models/BaseModel';

export default class User extends BaseModel{
	private setFields(): any {
		return {
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
	}

	private setOptions(): any {
		return {
			hooks: {
				beforeCount(options: any) {
					options.raw = true;
				}
			}
		};
	}
}