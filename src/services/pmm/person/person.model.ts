const Sequelize = require('sequelize');
import { BaseModel, IAssociation } from '../../../core/domain/models';

export class Person extends BaseModel {
	protected define() {
		return {
			name: 'Person',
			fields: {
				id: {
					type: Sequelize.INTEGER,
					autoIncrement: true,
					primaryKey: true
				},
				firstname: {
					type: Sequelize.STRING(50),
                    allowNull: false
				},
                lastname: {
					type: Sequelize.STRING(50),
                    allowNull: false
				},
                birthday: {
					type: Sequelize.DATE
				},
                newBirthday: {
					type: Sequelize.DATE
				},
                baptized: {
					type: Sequelize.BOOLEAN
				},
                integrationLevel: {
					type: Sequelize.INTEGER
				},
                gender: {
					type: Sequelize.CHAR(1)
				},
                occupation: {
					type: Sequelize.INTEGER
				},
                civilStatus: {
					type: Sequelize.INTEGER
				},
                lastVisit: {
					type: Sequelize.DATE
				},
                invitedById: {
					type: Sequelize.INTEGER
				},
                directionMain: {
					type: Sequelize.STRING(150)
				},
                directionExtra: {
					type: Sequelize.STRING(150)
				},
			}
		};
	}

    protected setAssociations(): IAssociation {
        return {
            oneToOne: [{
                model: 'Member',
                as: 'member',
                source: true
            }, {
                model: 'Harvest',
                as: 'harvest',
                source: true
            }],
            oneToMany: [{
                model: 'Person',
                as: 'inviter',
                foreignKey: 'invitedById'
            }, {
                model: 'Person',
                as: 'invited',
                foreignKey: 'invitedById',
                source: true
            }],
            manyToMany: [{
                model: 'Person',
                as: 'relative',
                through: 'Family',
                foreignKey: 'personId'
            }, {
                model: 'Person',
                as: 'family',
                through: 'Family',
                foreignKey: 'familyId'
            }]
        };
    }
}
