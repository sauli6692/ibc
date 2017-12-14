import * as lodash from 'lodash';

const authentication = require('feathers-authentication');
const jwt = require('feathers-authentication-jwt');
const local = require('feathers-authentication-local');
const Verifier = require('feathers-authentication-local').Verifier;

import { compareHash } from '../utils/cryptography';

export default function() {
    const app = this;
	const config = app.get('authentication');

    // Workarround to avoid feathers behaviour for usernameField
    // https://github.com/feathersjs/authentication/issues/508
    config.local.usernameField = 'username';

	// Set up authentication with the secret
	app.configure(authentication(config));
	app.configure(jwt());

	app.configure(local(lodash.assign({
        Verifier: CustomVerifier
    }, config.local)));

	// The `authentication` service is used to create a JWT.
	// The before `create` hook registers strategies that can be used
	// to create a new valid JWT (e.g. local or oauth2)
	app.service('authentication').hooks({
		before: {
			create: [
				(hook: any) => {
					hook.data.strategy = hook.data.strategy || config.defaultStrategy;
					return Promise.resolve(hook);
				},
				authentication.hooks.authenticate(config.strategies)
			],
			remove: [
				authentication.hooks.authenticate('jwt')
			]
		}
	});
}

class CustomVerifier extends Verifier {
	verify(req: any, username: string, password: string, done: any) {
		this.app.service(this.options.service).find({
			query: {
				username
			}
		}).then((user: any) => {
			if (lodash.isNil(user) || user.total === 0) {
                return done(null, false);
            }
            user = user.data[0];

            compareHash(user, password)
                .then((isValid) => {
                    done(null, isValid, {
                        username: user.username
                    });
                }).catch(done);
		}).catch(done);
	}
}
