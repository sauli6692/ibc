import { Request } from '../core/domain/http/Request';
import { Response } from '../core/domain/http/Response';
import testMiddleware from './testMiddleware';

const handler = require('feathers-errors/handler');
const notFound = require('feathers-errors/not-found');

export default function() {
    const app = this;

	app.use(testMiddleware);

    // Configure a middleware for 404s and the error handler (Last always)
    app.use(notFound());
    app.use(handler());
}
