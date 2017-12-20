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
				}
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
                component: 'rte',
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
            }, {
                model: 'PersonDiscipleship',
				as: 'discipleshipsReceived',
                source: true,
                foreignKey: 'discipleId'
			}, {
                model: 'PersonDiscipleship',
				as: 'discipleshipsTaught',
                source: true,
                foreignKey: 'teacherId'
			}, {
                model: 'Family',
				as: 'personFamily',
                source: true,
                foreignKey: 'personId'
			}, {
                model: 'Family',
				as: 'familyPerson',
                source: true,
                foreignKey: 'familyId'
			}, {
                model: 'IntegrationLevel',
                as: 'personIntegrationLevel',
                foreignKey: 'integrationLevel'
            }, {
                model: 'Occupation',
                as: 'personOccupation',
                foreignKey: 'occupation'
            }, {
                model: 'CivilStatus',
                as: 'personCivilStatus',
                foreignKey: 'civilStatus'
            }],
            manyToMany: [{
                model: 'Person',
                as: 'relative',
                through: 'pmmFamily',
                foreignKey: 'personId'
            }, {
                model: 'Person',
                as: 'family',
                through: 'pmmFamily',
                foreignKey: 'familyId'
            }]
        };
    }
}
