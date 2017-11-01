const Sequelize = require('sequelize');
import { BaseModel, IAssociation } from '../../../core/domain/models';

export class UserRole extends BaseModel {
	protected define() {
		return {
			name: 'UserRole',
			fields: {
                userId: {
                    type: Sequelize.INTEGER,
					primaryKey: true
				},
                roleId: {
					type: Sequelize.INTEGER,
					primaryKey: true
				}
			}
		};
	}
}
