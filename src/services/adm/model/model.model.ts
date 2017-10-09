// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
import { BaseModel } from '../../../core/domain/models/BaseModel';

export class Model extends BaseModel {
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
				}
			}
		};
	}
}
