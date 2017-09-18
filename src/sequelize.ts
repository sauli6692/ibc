import * as lodash from 'lodash';
const SequelizeClass = require('sequelize');

export default class Sequelize {
	set(app: any) {
		const db = app.get('db');
		const sequelize = new SequelizeClass(db.connectionString, {
			dialect: db.dialect,
			logging: db.logging,
			define: db.define
		});
		const oldSetup = app.setup;

		app.set('sequelizeClient', sequelize);

		app.setup = function(...args: any[]) {
			const result = oldSetup.apply(this, args);

			// Set up data relationships
			const models = sequelize.models;
			lodash.forOwn(models, (name) => {
				if ('associate' in models[name]) {
					models[name].associate(models);
				}
			});

			// Sync to the database
			sequelize.sync();

			return result;
		};
	}
}
