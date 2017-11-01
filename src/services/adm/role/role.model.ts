const Sequelize = require('sequelize');
import { BaseModel, IAssociation } from '../../../core/domain/models/';

export class Role extends BaseModel {
	protected define() {
		return {
			name: 'Role',
			fields: {
                id: {
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
					primaryKey: true
                },
				name: {
					type: Sequelize.STRING(25),
					allowNull: false
				},
				description: {
					type: Sequelize.STRING(255),
					allowNull: true
				}
			}
		};
	}

    protected setAssociations(): IAssociation {
		return {
			manyToMany: [{
                model: 'Component',
                as: 'components',
                through: 'RoleComponent'
            }, {
                model: 'User',
                as: 'users',
                through: 'UserRole'
            }]
		};
	}
}
