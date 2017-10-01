"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require('sequelize');
class BaseModel {
    constructor(app) {
        this.sequelizeClient = app.get('sequelizeClient');
    }
    define(name, definition, options, associations) {
        const model = this.sequelizeClient.define(name, definition, options);
        model.associate = associations || ((models) => { });
        return model;
    }
}
exports.default = BaseModel;
