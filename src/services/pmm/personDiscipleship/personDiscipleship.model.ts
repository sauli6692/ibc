const Sequelize = require('sequelize');
import { BaseModel } from '../../../core/domain/models/BaseModel';

export class PersonDiscipleship extends BaseModel {
	protected define() {
		return {
			name: 'PersonDiscipleship',
			fields: {
                disciple_id: {
                    type: Sequelize.INTEGER,
										primaryKey: true
									},
								discipleship_id: {
										type: Sequelize.INTEGER,
										primaryKey: true
									},
								teacher_id: {
									type: Sequelize.INTEGER,
									allowNull: false
								},
								last_lesson_id: {
									type: Sequelize.INTEGER
								},
								start_date: {
									type: Sequelize.DATE
								},
								end_date: {
									type: Sequelize.DATE
								}
				}
		};
	}
}
