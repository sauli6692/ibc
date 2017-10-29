import { BaseSequelizeService, ISchema } from '../../../core/domain/services';
import { Member } from './member.model';
import { hooks } from './member.hooks';

export class MemberService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'members',
            model: Member,
            id: 'personId'
        };
    }

    protected defineHooks() {
        return hooks;
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
