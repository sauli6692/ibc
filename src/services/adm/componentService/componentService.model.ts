const Sequelize = require('sequelize');
import { BaseModel } from '../../../core/domain/models';

export class ComponentService extends BaseModel {
	protected define() {
		return {
			name: 'ComponentService',
			fields: {
				componentId: {
					type: Sequelize.INTEGER,
					primaryKey: true
				},
				serviceId: {
                    type: Sequelize.INTEGER,
					primaryKey: true
				},
				privileges: {
					type: Sequelize.STRING(4),
					allowNull: false
				}
			}
		};
	}
}
