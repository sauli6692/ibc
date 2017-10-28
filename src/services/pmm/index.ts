import { OccupationService } from './occupation/occupation.service';
import { LessonService } from './lesson/lesson.service';
import { CivilStatusService } from './civilStatus/civilStatus.service';
import { DiscipleshipService } from './discipleship/discipleship.service';
import { IntegrationLevelService } from './integrationLevel/integrationLevel.service';
import { PersonService } from './person/person.service';
import { PersonDiscipleshipService } from './personDiscipleship/personDiscipleship.service';
import { MemberService } from './member/member.service';

export const pmm = {
    name: 'pmm',
    services: {
        occupation: OccupationService,
        lesson: LessonService,
        civilStatus: CivilStatusService,
        discipleship: DiscipleshipService,
        integrationLevels: IntegrationLevelService,
        person: PersonService,
        personDiscipleship: PersonDiscipleshipService,
        member: MemberService
    }
};
