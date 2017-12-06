import { BaseSequelizeService } from '../../../core/domain/services';
import { Lesson } from './lesson.model';

export class LessonService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'lessons',
            model: Lesson,
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
