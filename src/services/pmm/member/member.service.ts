import { BaseSequelizeService } from '../../../core/domain/services';
import { Member } from './member.model';
import { hooks } from './member.hooks';
import { schemas } from './member.schema';

export class MemberService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'members',
            model: Member,
            hooks,
            id: 'personId',
            schemas
        };
    }
}
