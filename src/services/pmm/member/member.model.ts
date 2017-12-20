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
				as: 'information',
				foreignKey: 'personId'
			}, {
                component: 'adm',
				model: 'User',
				as: 'user',
                source: true
			}, {
                component: 'rte',
                model: 'Collaborator',
                as: 'collaborator',
                source: true
            }],
            manyToMany: [{
                component: 'min',
                model: 'Ministry',
                as: 'ministries',
                through: 'minMinistryLeader',
                foreignKey: 'leaderId'
            }, {
                component: 'min',
                model: 'Ministry',
                as: 'memberMinistries',
                through: 'minMinistryMember',
                foreignKey: 'memberId'
            }]
		};
	}
}
