const Sequelize = require('sequelize');
import { BaseModel, IAssociation } from '../../../core/domain/models';

export class Model extends BaseModel {
	protected define() {
		return {
			name: 'Model',
			fields: {
                id: {
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
					primaryKey: true
                },
				name: {
					type: Sequelize.STRING(25),
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
                through: 'ComponentModel'
            }]
		};
	}
}
