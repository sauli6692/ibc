const Sequelize = require('sequelize');
import { BaseModel } from '../../../core/domain/models/BaseModel';

export class PersonDiscipleship extends BaseModel {
	protected define() {
		return {
			name: 'PersonDiscipleship',
			fields: {
				discipleId: {
					type: Sequelize.INTEGER,
					primaryKey: true
				},
				discipleshipId: {
					type: Sequelize.INTEGER,
					primaryKey: true
				},
				teacherId: {
					type: Sequelize.INTEGER,
					allowNull: false
				},
				lastLessonId: {
					type: Sequelize.INTEGER
				},
				startDate: {
					type: Sequelize.DATE
				},
				endDate: {
					type: Sequelize.DATE
				}
			}
		};
	}
}
