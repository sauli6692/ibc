const Sequelize = require('sequelize');
import { BaseModel } from '../../../core/domain/models/BaseModel';

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
								value: {
										type: Sequelize.STRING(50)
									}
				}
		};
	}
}
