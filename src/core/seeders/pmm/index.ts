import civilStatus from './civilStatus';
import discipleship from './discipleship';
import familyRelationship from './familyRelationship';
import integrationLevel from './integrationLevel';
import lesson from './lesson';
import member from './member';
import person from './person';
import occupation from './occupation';

export const pmm: any = {
    CivilStatus: {
        seed: civilStatus
    },
    Discipleship: {
        seed: discipleship
    },
    FamilyRelationship: {
        seed: familyRelationship
    },
    IntegrationLevel: {
        seed: integrationLevel
    },
    Lesson: {
        seed: lesson
    },
    Member: {
        seed: member,
        dependencies: [{
            model: 'Person'
        }]
    },
    Occupation: {
        seed: occupation
    },
    Person: {
        seed: person
    }
};
