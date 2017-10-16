const Sequelize = require('sequelize');
import { BaseModel } from '../../../core/domain/models/BaseModel';

export class Role extends BaseModel {
	protected define() {
		return {
			name: 'Role',
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
