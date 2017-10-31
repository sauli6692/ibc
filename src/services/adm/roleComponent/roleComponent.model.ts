// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
import { BaseModel, IAssociation } from '../../../core/domain/models';
import { logger } from '../../../core/utils/logger';

export class RoleComponent extends BaseModel {
	protected define() {
		return {
			name: 'RoleComponent',
			fields: {
				roleId: {
					type: Sequelize.INTEGER,
					primaryKey: true
				},
				componentId: {
                    type: Sequelize.INTEGER,
					primaryKey: true
				}
			}
		};
	}
}
