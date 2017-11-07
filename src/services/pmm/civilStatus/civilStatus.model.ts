const Sequelize = require('sequelize');
import { BaseModel, IAssociation } from '../../../core/domain/models';

export class CivilStatus extends BaseModel {
	protected define() {
		return {
			name: 'CivilStatus',
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
                as: 'personCivilStatus',
                source: true,
                foreignKey: 'civilStatus'
            }]
        };
    }
}
