const Sequelize = require('sequelize');
import { BaseModel } from '../../../core/domain/models/BaseModel';

export class CivilStatus extends BaseModel {
	protected define() {
		return {
			name: 'CivilStatus',
			fields: {
                id: {
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
										primaryKey: true
									},
								value: {
										type: Sequelize.STRING(50),
										allowNull: false
									}
				}
		};
	}
}
