// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
import { BaseModel } from '../../../core/domain/models/BaseModel';

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

    protected setAssociations(): Function {
		return (models: any) => {
            // let Component: any = this.getSequelizeModel();
            // Component.belongsToMany(models.Model, { as: 'Models', through: 'ADM_COMPONENT_MODEL', foreignKey: 'componentId' });
            // Component.belongsToMany(models.Role, { as: 'Roles', through: 'ADM_ROLE_COMPONENT', foreignKey: 'componentId' });
		};
	}
}
