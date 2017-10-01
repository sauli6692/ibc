"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require('sequelize');
const BaseModel_1 = require("./BaseModel");
const fields = {
    email: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: true
    },
};
const options = {
    hooks: {
        beforeCount(options) {
            options.raw = true;
        }
    }
};
const associations = (models) => {
};
const model = (app) => {
    let baseModel = new BaseModel_1.default(app);
    return baseModel.define('user', fields, options, associations);
};
exports.default = model;
