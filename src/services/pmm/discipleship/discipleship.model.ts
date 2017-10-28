const Sequelize = require('sequelize');
import { BaseModel, IAssociation } from '../../../core/domain/models';

export class Discipleship extends BaseModel {
	protected define() {
		return {
			name: 'Discipleship',
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
				}
			}
		};
	}

	protected setAssociations(): IAssociation {
		return {
			oneToMany: [{
                model: 'Lesson',
				as: 'lessons',
                source: true
			}]
		};
	}
}
