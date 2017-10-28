const Sequelize = require('sequelize');
import { BaseModel, IAssociation } from '../../../core/domain/models';

export class Member extends BaseModel {
	protected define() {
		return {
			name: 'Member',
			fields: {
				personId: {
					type: Sequelize.INTEGER,
					primaryKey: true
				}
			}
		};
	}

    protected setAssociations(): IAssociation {
		return {
			oneToOne: [{
				model: 'Person',
				as: 'personInformation',
				foreignKey: 'personId'
			}, {
				model: 'User',
				as: 'user',
                source: true
			}, {
                model: 'Collaborator',
                as: 'collaborator',
                source: true
            }]
		};
	}
}
