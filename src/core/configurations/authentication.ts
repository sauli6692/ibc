import * as _ from 'lodash';

const authentication = require('feathers-authentication');
const jwt = require('feathers-authentication-jwt');
const local = require('feathers-authentication-local');
const Verifier = require('feathers-authentication-local').Verifier;

import { compareHash } from '../utils/cryptography';

export default function() {
    const app = this;
	const config = app.get('authentication');

    // Workarround to avoid feathers behaviour for usernameField
    // Reference: https://github.com/feathersjs/authentication/issues/508
    config.local.usernameField = 'username';

	app.configure(authentication(config));
	app.configure(jwt());

	app.configure(local(_.assign({
        Verifier: PBKDF2Verifier
    }, config.local)));

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

class PBKDF2Verifier extends Verifier {
	verify(req: any, username: string, password: string, done: any) {

		this.app.service(this.options.service).get(username).then((user: any) => {
			if (_.isNil(user)) {
                return done(null, false);
            }

            compareHash(user, password)
                .then(isValid => {
                    if (isValid) {
                        this.app.service(`${this.options.service}/:userId/roles`).find({
							userId: user.id
						}).then((roles: any) => {
                            let payload = {
								id: user.id,
								memberId: user.memberId,
								roles: _.map(roles, (role: any) => role.id)
                            };
                            done(null, payload, payload);
                        }).catch(done);
                    } else {
						done(null, isValid);
					}
                }).catch(done);
		}).catch(done);
	}
}
