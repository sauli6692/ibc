const Sequelize = require('sequelize');
import { BaseModel, IAssociation } from '../../../core/domain/models/';

export class Collaborator extends BaseModel {
	protected define() {
		return {
			name: 'Collaborator',
			fields: {
				memberId: {
					type: Sequelize.INTEGER,
					primaryKey: true
				},
				routeId: {
					type: Sequelize.INTEGER
				},
				ministryId: {
					type: Sequelize.INTEGER
				}
			}
		};
	}

	protected setAssociations(): IAssociation {
		return {
			oneToMany: [{
				model: 'Route',
				as: 'route',
				foreignKey: 'routeId'
			}]
		};
	}
}
