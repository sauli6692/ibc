const Sequelize = require('sequelize');
import { BaseModel, IAssociation } from '../../../core/domain/models';

export class FamilyRelationship extends BaseModel {
	protected define() {
		return {
			name: 'FamilyRelationship',
			fields: {
                id: {
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
					primaryKey: true
				},
				value: {
					type: Sequelize.STRING(50)
				}
			}
		};
	}

    protected setAssociations(): IAssociation {
        return {
            oneToMany: [{
                model: 'Family',
                as: 'familyRelationship',
                source: true,
                foreignKey: 'relationship'
            }]
        };
    }
}
