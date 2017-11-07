const Sequelize = require('sequelize');
import { BaseModel, IAssociation } from '../../../core/domain/models';

export class Occupation extends BaseModel {
	protected define() {
		return {
			name: 'Occupation',
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
                model: 'Person',
                as: 'personOccupation',
                source: true,
                foreignKey: 'occupation'
            }]
        };
    }
}
