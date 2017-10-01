const users = require('./users/users.service.js');
export default () => {
	const app = this; // eslint-disable-line no-unused-vars
	app.configure(users);
};
