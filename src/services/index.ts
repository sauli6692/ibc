const users = require('./users/users.service.js');
export default (app: any) => {
	app.configure(users);
};
