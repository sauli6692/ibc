const Sequelize = require('sequelize');
import { BaseModel, IAssociation } from '../../../core/domain/models';

export class IntegrationLevel extends BaseModel {
	protected define() {
		return {
			name: 'IntegrationLevel',
			fields: {
                id: {
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
					primaryKey: true
				},
				value: {
					type: Sequelize.STRING(20)
				}
			}
		};
	}

    protected setAssociations(): IAssociation {
        return {
            oneToMany: [{
                model: 'Person',
                as: 'personIntegrationLevel',
                source: true,
                foreignKey: 'integrationLevel'
            }]
        };
    }
}
