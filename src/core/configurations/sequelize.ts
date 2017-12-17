import * as _ from 'lodash';
import { logger } from '../utils/logger';
const Sequelize = require('sequelize');

export default function() {
    const app = this;
	const db = app.get('db');
	const sequelize = new Sequelize(db.connectionString, {
		dialect: db.dialect,
		logging: db.logging ? console.log : false,
		define: db.define,
        underscored: true
	});
	const oldSetup = app.setup;

	app.set('sequelizeClient', sequelize);

	app.setup = (...args: any[]) => {
		const result = oldSetup.apply(this, args);

		// Set up data relationships
		const models = sequelize.models;

		_.forOwn(models, (model: any) => {
			if ('associate' in model) {
				model.associate(models);
			}
		});

		// Sync to the database
        if (app.get('db').sync) {
            sequelize.sync();
        }

		return result;
	};
}
