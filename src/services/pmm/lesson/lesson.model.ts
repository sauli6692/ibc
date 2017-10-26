const Sequelize = require('sequelize');
import { BaseModel, IAssociation } from '../../../core/domain/models';

export class Lesson extends BaseModel {
	protected define() {
		return {
			name: 'Lesson',
			fields: {
				id: {
					type: Sequelize.INTEGER,
					autoIncrement: true,
					primaryKey: true
				},
				name: {
					type: Sequelize.STRING(150)
				},
				description: {
					type: Sequelize.STRING(150),
				},
				discipleshipId: {
					type: Sequelize.INTEGER,
					allowNull: false
				}
			}
		};
	}

	protected setAssociations(): IAssociation {
		return {
			oneToMany: [{
				model: 'Discipleship',
				as: 'discipleship',
				foreignKey: 'discipleshipId'
			}]
		};
	}
}
