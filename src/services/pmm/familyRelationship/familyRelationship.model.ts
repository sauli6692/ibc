const Sequelize = require('sequelize');
import { BaseModel } from '../../../core/domain/models/';

export class FamilyRelationship extends BaseModel {
	protected define() {
		return {
			name: 'FamilyRelationship',
			fields: {
                id: {
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
					primaryKey: true
				},
				value: {
					type: Sequelize.STRING(50)
				}
			}
		};
	}
}
