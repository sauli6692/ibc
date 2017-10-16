const Sequelize = require('sequelize');
import { BaseModel } from '../../../core/domain/models/BaseModel';
import { IAssociation } from '../../../core/domain/models/IAssociation';
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
}
