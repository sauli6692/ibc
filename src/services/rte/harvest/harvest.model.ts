const Sequelize = require('sequelize');
import { BaseModel, IAssociation } from '../../../core/domain/models/';
import { logger } from '../../../core/utils/logger';

export class Harvest extends BaseModel {
    protected define() {
        return {
            name: 'Harvest',
            fields: {
                personId: {
                    type: Sequelize.INTEGER,
                    primaryKey: true
                },
                routeId: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                discarded: {
                    type: Sequelize.BOOLEAN,
                    allowNull: true,
                    default: 0
                },
                discardedReason: {
                    type: Sequelize.STRING(100),
                    allowNull: true
                }
            }
        };
    }

    protected setAssociations(): IAssociation {
		return {
            oneToOne: [{
                model: 'Person',
                as: 'information'
            }],
			oneToMany: [{
				model: 'Route',
				as: 'route'
			}]
		};
	}
}
