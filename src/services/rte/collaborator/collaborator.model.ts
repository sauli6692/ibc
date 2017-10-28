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
					type: Sequelize.INTEGER,
                    allowNull: false
				},
				ministryId: {
					type: Sequelize.INTEGER
				},
				routeLeader: {
					type: Sequelize.BOOLEAN,
                    allowNull: false,
					defaultValue: 0
				}
			}
		};
	}

	protected setAssociations(): IAssociation {
		return {
            oneToOne: [{
                model: 'Member',
                as: 'memberInformation'
            }, {
				model: 'Ministry',
				as: 'ministry'
			}],
			oneToMany: [{
				model: 'Route',
				as: 'route'
			}]
		};
	}
}
