const Sequelize = require('sequelize');
import { BaseModel, IAssociation } from '../../../core/domain/models';
import { logger } from '../../../core/utils/logger';

export class Route extends BaseModel {
    protected define() {
        return {
            name: 'Route',
            fields: {
                id: {
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                name: {
                    type: Sequelize.STRING(150),
                    allowNull: false
                },
                directionMain: {
                    type: Sequelize.STRING(150),
                    allowNull: false
                },
                directionExtra: {
                    type: Sequelize.STRING(150),
                    allowNull: true
                },
                zoneMap: {
                    type: Sequelize.BLOB,
                    allowNull: true
                },
                leaderId: {
                    type: Sequelize.STRING(150),
                    allowNull: false
                }
            }
        };
    }

    protected setAssociations(): IAssociation {
        return {
            oneToMany: [{
                model: 'Collaborator',
                as: 'collaborators',
                foreignKey: 'routeId',
                source: true
            }]
        };
    }
}
