import { BaseSequelizeService } from '../../../core/domain/services';
import { Lesson } from './lesson.model';
import { schemas } from './lesson.schema';

export class LessonService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'lessons',
            model: Lesson,
            schemas
        };
    }
}
