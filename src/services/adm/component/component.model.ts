// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
import { BaseModel } from '../../../core/domain/models/BaseModel';
import { IAssociation } from '../../../core/domain/models/IAssociation';
import { logger } from '../../../core/utils/logger';
import { ComponentService } from '../componentService/componentService.model';

export class Component extends BaseModel {
	protected define() {
		return {
			name: 'Component',
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
				model: 'Service',
				as: 'services',
                through: 'ComponentService'
			}, {
                model: 'Role',
                as: 'roles',
                through: 'RoleComponent'
            }]
		};
	}
}
