const Sequelize = require('sequelize');
import { BaseModel, IAssociation } from '../../../core/domain/models/';

export class MinistryObjective extends BaseModel {
	protected define() {
		return {
			name: 'MinistryObjective',
			fields: {
                id: {
					type: Sequelize.INTEGER,
					autoIncrement: true,
					primaryKey: true
				},
				objective: {
					type: Sequelize.STRING(255),
					allowNull: false
				},
				ministryId: {
					type: Sequelize.INTEGER,
					allowNull: false
				}
			}
		};
	}

    protected setAssociations(): IAssociation {
        return {
			oneToMany: [{
				model: 'Ministry',
				as: 'ministry',
				foreignKey: 'ministryId'
			}]
		};
    }
}
