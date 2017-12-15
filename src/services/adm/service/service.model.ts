const Sequelize = require('sequelize');
import { BaseModel, IAssociation } from '../../../core/domain/models';

export class Service extends BaseModel {
	protected define() {
		return {
			name: 'Service',
			fields: {
                id: {
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
					primaryKey: true
                },
				route: {
					type: Sequelize.STRING(50),
					allowNull: false
				}
			}
		};
	}

    protected setAssociations(): IAssociation {
		return {
			manyToMany: [{
				model: 'Component',
				as: 'components',
                through: 'ComponentService'
            }]
		};
	}
}
