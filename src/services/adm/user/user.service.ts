import BaseService from '../../../core/domain/BaseService';
import User from './user.model';

export default class UserService extends BaseService {
    protected define() {
        console.log(typeof User);
        return {
            name: 'user',
            model: User
        };
    }
}
