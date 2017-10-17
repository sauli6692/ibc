const Sequelize = require('sequelize');
import { BaseModel } from '../../../core/domain/models/BaseModel';

export class Occupation extends BaseModel {
	protected define() {
		return {
			name: 'Occupation',
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
