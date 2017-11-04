const Sequelize = require('sequelize');
import { BaseModel } from '../../../core/domain/models';

export class Family extends BaseModel {
	protected define() {
		return {
			name: 'Family',
			fields: {
				personId: {
					type: Sequelize.INTEGER,
					primaryKey: true
				},
				familyId: {
					type: Sequelize.INTEGER,
					primaryKey: true
				},
				relationship: {
					type: Sequelize.INTEGER,
					allowNull: false
				}
			}
		};
	}
}
