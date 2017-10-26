import * as lodash from 'lodash';
import * as Errors from 'feathers-errors';

import { BaseCustomService, IService, ISchema } from '../../../core/domain/services';

export class DiscipleshipLessonService extends BaseCustomService implements IService {
    private LessonModel: any;

    constructor(component: string, app: any) {
        super(component, app);
        this.LessonModel = this.app.getModel('Lesson');
    }

    protected define() {
        return {
            route: 'discipleships/:discipleshipId/lessons'
        };
    }

    public find(params: any): Promise<any> {
        return this.LessonModel.findAll({
            where: { discipleshipId: params.discipleshipId }
        }).then((results: any) => {
            if (lodash.isEmpty(results)) {
                throw new Errors.NotFound('Lessons not found.');
            }
            return results;
        });
    }

    public get(id: number, params: any): Promise<any> {
        return this.LessonModel.findAll({
            where: { id, discipleshipId: params.discipleshipId },
        }).then((results: any) => {
            if (lodash.isEmpty(results)) {
                throw new Errors.NotFound('Lesson not found.');
            }
            return results[0];
        });
    }

    protected defineCreateSchema(): ISchema {
        return {
            type: 'object'
        };
    }

    protected defineUpdateSchema(): ISchema {
        return {
            type: 'object'
        };
    }
}
