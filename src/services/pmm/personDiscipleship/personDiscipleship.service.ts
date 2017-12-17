import * as _ from 'lodash';
import * as Errors from 'feathers-errors';

import { BaseCustomService, IService } from '../../../core/domain/services';
import { BaseModel } from '../../../core/domain/models';
import { PersonDiscipleship } from './personDiscipleship.model';
import { schemas } from './personDiscipleship.schema';

export class PersonDiscipleshipService extends BaseCustomService implements IService {
    private PersonDiscipleship: any;
    private Person: any;
    private Discipleship: any;
    private Lesson: any;

    constructor(component: string, app: any) {
        super(component, app);
        let model = new PersonDiscipleship(this.component, this.app);
        this.PersonDiscipleship = model.getSequelizeModel();
    }

    public afterInit(): void {
        this.Person = this.app.getModel('Person');
        this.Discipleship = this.app.getModel('Discipleship');
        this.Lesson = this.app.getModel('Lesson');
    }

    protected define() {
        return {
            route: 'people/:discipleId/discipleships',
            schemas
        };
    }

    public find(params: any): Promise<any> {
        return this.PersonDiscipleship.findAll({
            where: { discipleId: params.discipleId },
            include: [{
                model: this.Discipleship,
                as: 'discipleship'
            }, {
                model: this.Person,
                as: 'teacher'
            }, {
                model: this.Lesson,
                as: 'lesson'
            }]
        }).then((results: any) => {
            if (_.isEmpty(results)) {
                throw new Errors.NotFound('Person not found.');
            }

            return _.map(results, (row: any) => {
                let result: any = {
                    startDate: row.startDate,
                    endDate: row.endDate
                };

                if (!_.isNil(row.discipleship)) {
                    result.discipleship = {
                        id: row.discipleship.id,
                        name: row.discipleship.name
                    };
                }

                if (!_.isNil(row.teacher)) {
                    result.teacher = {
                        id: row.teacher.id,
                        name: `${row.teacher.firstname} ${row.teacher.lastname}`
                    };
                }

                if (!_.isNil(row.lesson)) {
                    result.lesson = {
                        id: row.lesson.id,
                        name: row.lesson.name
                    };
                }

                return result;
            });
        });
    }

    public get(id: number, params: any): Promise<any> {
        return this.PersonDiscipleship.findAll({
            where: {
                discipleId: params.discipleId,
                discipleshipId: id
            },
            include: [{
                model: this.Discipleship,
                as: 'discipleship'
            }, {
                model: this.Person,
                as: 'teacher'
            }, {
                model: this.Lesson,
                as: 'lesson'
            }]
        }).then((results: any) => {
            if (_.isEmpty(results)) {
                throw new Errors.NotFound('Not found.');
            }

            let row = results[0];
            let result: any = {
                startDate: row.startDate,
                endDate: row.endDate
            };

            if (!_.isNil(row.discipleship)) {
                result.discipleship = {
                    id: row.discipleship.id,
                    name: row.discipleship.name
                };
            }

            if (!_.isNil(row.teacher)) {
                result.teacher = {
                    id: row.teacher.id,
                    name: `${row.teacher.firstname} ${row.teacher.lastname}`
                };
            }

            if (!_.isNil(row.lesson)) {
                result.lesson = {
                    id: row.lesson.id,
                    name: row.lesson.name
                };
            }

            return result;
        });
    }

    public create(data: any, params: any): Promise<any> {
        data.discipleId = _.parseInt(params.discipleId);

        return this.PersonDiscipleship.build(data).save();
    }

    public patch(id: number, data: any, params: any): Promise<any> {
        let where: any = {
            discipleId: params.discipleId,
            discipleshipId: id
        };

        return this.PersonDiscipleship.update({
            relationship: data.relationship
        }, { where });
    }

    public remove(id: number, params: any): Promise<any> {
        let where: any = {
            discipleId: params.discipleId
        };

        if (!_.isNil(id)) {
            where.discipleshipId = id;
        }

        return this.PersonDiscipleship.destroy({ where });
    }
}
