const crypto = require('crypto');

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

export const compareHash = (user: any, password: string) => {
    return generateHash(password, user.salt)
        .then(newHash => newHash === user.password);
};

function generateHash(password: string, salt: string) {
    let iterations = 100000;
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(password, salt, iterations, 64, 'sha512', (e: any, hash: any) => {
            if (e) reject(e);
            resolve(hash.toString('hex'));
        });
    });
}
