import { BaseSequelizeService } from '../../../core/domain/services';
import { Member } from './member.model';
import { hooks } from './member.hooks';

export class MemberService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'members',
            model: Member,
            hooks,
            id: 'personId',
            schemas: {
                create: {
                    type: 'object'
                },
                update: {
                    type: 'object'
                }
            }
        };
    }
}
