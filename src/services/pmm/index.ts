import { OccupationService } from './occupation/occupation.service';
import { LessonService } from './lesson/lesson.service';
import { CivilStatusService } from './civilStatus/civilStatus.service';
import { DiscipleshipService } from './discipleship/discipleship.service';
import { IntegrationLevelService } from './integrationLevel/integrationLevel.service';
import { PersonDiscipleshipService } from './personDiscipleship/personDiscipleship.service';

export const pmm = {
    name: 'pmm',
    services: {
        occupation: OccupationService,
        lesson: LessonService,
        civilStatus: CivilStatusService,
        discipleship: DiscipleshipService,
        integrationLevels : IntegrationLevelService,
        personDiscipleships : PersonDiscipleshipService
    }
};
