import { BaseSequelizeService, ISchema } from '../../../core/domain/services';
import { Lesson } from './lesson.model';

export class LessonService extends BaseSequelizeService {
    protected define() {
        return {
            route: 'lessons',
            model: Lesson
        };
    }

    protected defineCreateSchema(): ISchema {
        return {};
    }

    protected defineUpdateSchema(): ISchema {
        return {};
    }
}
