"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authentication = require('feathers-authentication');
const jwt = require('feathers-authentication-jwt');
const local = require('feathers-authentication-local');
class Authentication {
    set(app) {
        const config = app.get('authentication');
        app.configure(authentication(config));
        app.configure(jwt());
        app.configure(local(config.local));
        app.service('authentication').hooks({
            before: {
                create: [
                    authentication.hooks.authenticate(config.strategies)
                ],
                remove: [
                    authentication.hooks.authenticate('jwt')
                ]
            }
        });
    }
}
exports.default = Authentication;
