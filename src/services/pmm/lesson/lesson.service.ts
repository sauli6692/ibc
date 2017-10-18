import { BaseSequelizeService } from '../../../core/domain/services/BaseSequelizeService';
import { Lesson } from './lesson.model';

export class LessonService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'lessons',
            model: Lesson
        };
    }
}
