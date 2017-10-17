const Sequelize = require('sequelize');
import { BaseModel } from '../../../core/domain/models/BaseModel';

export class Collaborator extends BaseModel {
	protected define() {
		return {
			name: 'Collaborator',
			fields: {
                member_id: {
                    type: Sequelize.INTEGER,
										primaryKey: true
									},
								route_id: {
										type: Sequelize.INTEGER
									},
								ministry_id: {
										type: Sequelize.INTEGER
									}
						}
		};
	}
}
