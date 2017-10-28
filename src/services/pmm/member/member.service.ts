import { BaseSequelizeService, ISchema } from '../../../core/domain/services';
import { Member } from './member.model';

export class MemberService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'members',
            model: Member
        };
    }

    protected defineCreateSchema(): ISchema {
        return {
            type: 'object'
        };
    }

    protected defineUpdateSchema(): ISchema {
        return {
            type: 'object'
        };
    }
}
