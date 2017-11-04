const Sequelize = require('sequelize');
import { BaseModel } from '../../../core/domain/models';

export class MinistryMember extends BaseModel {
	protected define() {
		return {
			name: 'MinistryMember',
			fields: {
				ministryId: {
					type: Sequelize.INTEGER,
					primaryKey: true
				},
				memberId: {
                    type: Sequelize.INTEGER,
					primaryKey: true
				}
			}
		};
	}
}
