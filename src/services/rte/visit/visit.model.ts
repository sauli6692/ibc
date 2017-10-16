const Sequelize = require('sequelize');
import { BaseModel } from '../../../core/domain/models/BaseModel';
import { IAssociation } from '../../../core/domain/models/IAssociation';
import { logger } from '../../../core/utils/logger';

export class Visit extends BaseModel {
    protected define() {
        return {
            name: 'Visit',
            fields: {
                collaboratorId: {
                    type: Sequelize.INTEGER,
                    primaryKey: true
                },
                harvestId: {
                    type: Sequelize.INTEGER,
                    primaryKey: true
                },
                date: {
                    type: Sequelize.Date,
                    allowNull: false
                }
            }
        };
    }
}
