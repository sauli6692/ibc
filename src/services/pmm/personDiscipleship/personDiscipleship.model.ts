const Sequelize = require('sequelize');
import { BaseModel, IAssociation } from '../../../core/domain/models/';

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

    protected setAssociations(): IAssociation {
        return {
            oneToMany: [{
                model: 'Person',
				as: 'disciple',
                foreignKey: 'discipleId'
			}, {
                model: 'Person',
				as: 'teacher',
                foreignKey: 'teacherId'
			}, {
                model: 'Discipleship',
				as: 'discipleship'
			}, {
                model: 'Lesson',
				as: 'lesson',
                foreignKey: 'lastLessonId'
			}]
        };
    }
}
