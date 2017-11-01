const Sequelize = require('sequelize');
import { BaseModel, IAssociation } from '../../../core/domain/models';

export class User extends BaseModel {
	protected define() {
		return {
			name: 'User',
			fields: {
                id: {
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
					primaryKey: true
                },
				username: {
					type: Sequelize.STRING(50),
					allowNull: false,
                    unique: true
				},
				password: {
					type: Sequelize.STRING(64),
					allowNull: false
				},
                salt: {
                    type: Sequelize.STRING(64),
					allowNull: false
                },
                memberId: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    unique: true
                }
			}
		};
	}

    protected setAssociations(): IAssociation {
		return {
			oneToOne: [{
				model: 'Member',
				as: 'owner'
			}],
            manyToMany: [{
                model: 'Role',
                as: 'roles',
                through: 'UserRole'
            }]
		};
	}
}
