const crypto = require('crypto');

const config = require('../../../config/default.json').authentication;

export const hashPassword = (password: string) => {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err: any, buf: any) => {
            if (err) {
                return reject(err);
            }

            let salt = buf.toString('hex');
            generateHash(password, salt)
                .then((hashedPassword: string) => {
                    resolve({
                        password: hashedPassword,
                        salt
                    });
                }).catch(reject);
        });
    });
};

export const hashPasswordSync = (password: string) => {
    let buf = crypto.randomBytes(16);
    let salt = buf.toString('hex');
    return {
        password: generateHashSync(password, salt),
        salt
    };
};

export const compareHash = (user: any, password: string) => {
    return generateHash(password, user.salt)
        .then(newHash => newHash === user.password);
};

function generateHash(password: string, salt: string) {
    let iterations = config.iterations;
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(password, salt, iterations, 64, 'sha512', (e: any, hash: any) => {
            if (e) reject(e);
            resolve(hash.toString('hex'));
        });
    });
}

function generateHashSync(password: string, salt: string) {
    let iterations = config.iterations;
    let hash = crypto.pbkdf2Sync(password, salt, iterations, 64, 'sha512');
    return hash.toString('hex');
}
