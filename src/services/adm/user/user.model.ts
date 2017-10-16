const Sequelize = require('sequelize');
import { BaseModel } from '../../../core/domain/models/BaseModel';

export class User extends BaseModel {
	protected define() {
		return {
			name: 'User',
			fields: {
                id: {
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
					primaryKey: true
                },
				username: {
					type: Sequelize.STRING(50),
					allowNull: false,
                    unique: true
				},
				password: {
					type: Sequelize.STRING(64),
					allowNull: false
				},
                salt: {
                    type: Sequelize.STRING(64),
					allowNull: false
                }
			}
		};
	}
}
