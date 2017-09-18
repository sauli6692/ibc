import Authentication from './authentication';
import Middleware from './middleware';
import Sequelize from './sequelize';
import appHooks from './app.hooks';

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
const services = require('./services');
// const appHooks = require('./app.hooks');

const authentication = new Authentication();
const middleware = new Middleware();
const sequelize = new Sequelize();

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
// Host the public folder
app.use('/', feathers.static(app.get('public')));

// Set up Plugins and providers
app.configure(hooks());
// app.configure(sequelize);
sequelize.set(app);
app.configure(rest());
app.configure(socketio());

// Configure other middleware (see `middleware/index.js`)
// app.configure(middleware);
middleware.set(app);
authentication.set(app);
// Set up our services (see `services/index.js`)
app.configure(services);
// Configure a middleware for 404s and the error handler
app.use(notFound());
app.use(handler());

app.hooks(appHooks);

export default app;
