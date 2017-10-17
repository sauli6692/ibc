import { OccupationService } from './occupation/occupation.service';
import { LessonService } from './lesson/lesson.service';
import { CivilStatusService } from './civilStatus/civilStatus.service';

export const pmm = {
    name: 'pmm',
    services: {
        occupation: OccupationService,
        lesson: LessonService,
        civilStatus: CivilStatusService
    }
};
