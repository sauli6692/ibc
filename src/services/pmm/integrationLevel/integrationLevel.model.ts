const Sequelize = require('sequelize');
import { BaseModel } from '../../../core/domain/models/BaseModel';

export class IntegrationLevel extends BaseModel {
	protected define() {
		return {
			name: 'IntegrationLevel',
			fields: {
                id: {
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
										primaryKey: true
									},
								value: {
										type: Sequelize.STRING(20)
									}
				}
		};
	}
}
