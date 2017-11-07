const Sequelize = require('sequelize');
import { BaseModel, IAssociation } from '../../../core/domain/models';

export class Family extends BaseModel {
	protected define() {
		return {
			name: 'Family',
			fields: {
				personId: {
					type: Sequelize.INTEGER,
					primaryKey: true
				},
				familyId: {
					type: Sequelize.INTEGER,
					primaryKey: true
				},
				relationship: {
					type: Sequelize.INTEGER,
					allowNull: false
				}
			}
		};
	}

    protected setAssociations() {
        return {
            oneToMany: [{
                model: 'FamilyRelationship',
                as: 'familyRelationship',
                foreignKey: 'relationship'
            }, {
                model: 'Person',
                as: 'personFamily',
                foreignKey: 'personId'
            }, {
                model: 'Person',
                as: 'familyPerson',
                foreignKey: 'familyId'
            }]
        };
    }
}
