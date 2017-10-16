const Sequelize = require('sequelize');
import { BaseModel } from '../../../core/domain/models/BaseModel';
import { IAssociation } from '../../../core/domain/models/IAssociation';
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
                    type: Sequelize.String(150),
                    allowNull: false
                },
                direction1: {
                    type: Sequelize.String(150),
                    allowNull: false
                },
                direction2: {
                    type: Sequelize.String(150),
                    allowNull: true
                },
                zoneMap: {
                    type: Sequelize.Blob,
                    allowNull: true
                },
                leaderId: {
                    type: Sequelize.String(150),
                    allowNull: false
                }
            }
        };
    }
}
