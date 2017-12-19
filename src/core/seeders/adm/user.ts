import { hashPasswordSync } from '../../utils/cryptography';

let result = hashPasswordSync('root');

export default [{
    id: 1,
    username: 'root',
    password: result.password,
    salt: result.salt,
    memberId: 1
}];
