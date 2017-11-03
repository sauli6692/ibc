const Sequelize = require('sequelize');
import { BaseModel } from '../../../core/domain/models';

export class MinistryLeader extends BaseModel {
	protected define() {
		return {
			name: 'MinistryLeader',
			fields: {
				ministryId: {
					type: Sequelize.INTEGER,
					primaryKey: true
				},
				leaderId: {
                    type: Sequelize.INTEGER,
					primaryKey: true
				}
			}
		};
	}
}
