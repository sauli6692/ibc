"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash = require("lodash");
const SequelizeClass = require('sequelize');
class Sequelize {
    set(app) {
        const db = app.get('db');
        const sequelize = new SequelizeClass(db.connectionString, {
            dialect: db.dialect,
            logging: db.logging,
            define: db.define
        });
        const oldSetup = app.setup;
        app.set('sequelizeClient', sequelize);
        app.setup = function (...args) {
            const result = oldSetup.apply(this, args);
            const models = sequelize.models;
            lodash.forOwn(models, (name) => {
                if ('associate' in models[name]) {
                    models[name].associate(models);
                }
            });
            sequelize.sync();
            return result;
        };
    }
}
exports.default = Sequelize;
