const Sequelize = require('sequelize');
import { BaseModel } from '../../../core/domain/models/BaseModel';

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
										type: Sequelize.STRING(25)
									},
								description: {
										type: Sequelize.STRING(50),
									},
								discipleship_id : {
										type: Sequelize.INTEGER,
										allowNull: false
									}
								}
		};
	}
}
