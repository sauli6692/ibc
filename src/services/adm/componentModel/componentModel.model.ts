const Sequelize = require('sequelize');
import { BaseModel, IAssociation } from '../../../core/domain/models';

export class ComponentModel extends BaseModel {
	protected define() {
		return {
			name: 'ComponentModel',
			fields: {
				componentId: {
					type: Sequelize.INTEGER,
					primaryKey: true
				},
				modelId: {
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
