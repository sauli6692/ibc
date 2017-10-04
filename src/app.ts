import * as lodash from 'lodash';
// import authentication from './core/services/authentication';
import configurations from './core/configurations';
import middleware from './middleware';
import appHooks from './app.hooks';
// import sequelize from './core/services/sequelize';

const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const feathers = require('feathers');
const configuration = require('feathers-configuration');
const hooks = require('feathers-hooks');
const rest = require('feathers-rest');
const socketio = require('feathers-socketio');

const handler = require('feathers-errors/handler');
const notFound = require('feathers-errors/not-found');

// const middleware = require('./middleware');
// const services = require('./services');
// const appHooks = require('./app.hooks');

// const authentication = new Authentication();
// const middleware = new Middleware();
// const sequelize = new Sequelize();

// const sequelize = require('./sequelize');

const app = feathers();

// Load app configuration
app.configure(configuration());
// Enable CORS, security, compression, favicon and body parsing
app.use(cors());
app.use(helmet());
app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));

app.use('/', feathers.static(app.get('public')));

// Set up Plugins and providers
app.configure(hooks());
app.configure(rest());
app.configure(socketio());

// Configure other middleware (see `middleware/index.js`)
lodash.forEach(configurations, (configuration) => configuration(app));
// Configure a middleware for 404s and the error handler
app.use(notFound());
app.use(handler());

app.hooks(appHooks);

export default app;
