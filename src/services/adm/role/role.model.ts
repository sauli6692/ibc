// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
import BaseModel from '../../../core/domain/BaseModel';

export default class Role extends BaseModel {
	protected define() {
		return {
			name: 'role',
			fields: {
                id: {
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
					primaryKey: true
                },
				name: {
					type: Sequelize.STRING(25),
					allowNull: false
				},
				description: {
					type: Sequelize.STRING(255),
					allowNull: true
				}
			}
		};
	}
}
