const Sequelize = require('sequelize');
import { BaseModel, IAssociation } from '../../../core/domain/models';

export class Lesson extends BaseModel {
	protected define() {
		return {
			name: 'Lesson',
			fields: {
                discipleshipId: {
                    type: Sequelize.INTEGER,
                    primaryKey: true
                },
				id: {
					type: Sequelize.INTEGER,
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
				model: 'Discipleship',
				as: 'discipleship'
			}, {
				model: 'PersonDiscipleship',
				as: 'discipleships',
                source: true,
				foreignKey: 'lastLessonId'
			}]
		};
	}
}
