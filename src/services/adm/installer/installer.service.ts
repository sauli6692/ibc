import * as _ from 'lodash';
import * as Errors from 'feathers-errors';

import { BaseCustomService, IService } from '../../../core/domain/services';
import { seeders } from '../../../core/seeders';
import { InvalidDependency } from '../../../core/domain/exceptions';

export class InstallerService extends BaseCustomService implements IService {
    private errors: Array<any>;

    constructor(component: string, app: any) {
        super(component, app);
        this.errors = [];
    }

    protected define() {
        return {
            route: 'install',
            authenticate: false
        };
    }

    public find(params: any): Promise<any> {
        let seedersList = this.joinSeeders();
        let seedersExecutions = this.generateExecutions(seedersList);
        return Promise.resolve({
            results: seedersList,
            errors: this.errors
        });
    }

    private joinSeeders(): Array<any> {
        let result: Array<any> = [];

        _.forOwn(seeders, (component, componentName) => {
            _.forOwn(component, (seeder: any, model: string) => {
                    result = _.concat(result, this.addSeeder(seeder, componentName, model));
            });
        });

        return result;
    }

    private addSeeder(seeder: any, component: string, model: string): Array<any> {
        let result: Array<any> = [];

        if (!seeder.added) {
            try {
                let dependencies = this.getDependencies(component, model, seeder.dependencies);
                result = _.concat(result, dependencies);

                seeder.model = model;
                seeder.added = true;
                result.push(seeder);
            } catch (e) {
                if (!seeder.dependencyError) {
                    let error = {};
                    if (e instanceof InvalidDependency) {
                        error = _.assign({
                            source: { component, model }
                        }, e.toJSON());
                    } else {
                        error = { message: e.message };
                    }
                    this.errors.push(error);
                    seeder.dependencyError = true;
                } else {
                    throw new InvalidDependency({ component, model });
                }
            }
        }
        return result;
    }

    private getDependencies(component: string, sourceModel: string, dependencies: any): Array<any> {
        if (_.isNil(dependencies)) return [];

        return _.reduce(dependencies, (prev, dependency: any) => {
            let componentName = dependency.component || component;
            let componentSeeder = seeders[componentName];

            if (_.isNil(componentSeeder)) {
                throw new InvalidDependency(dependency);
            }

            let seeder = componentSeeder[dependency.model];

            if (_.isNil(seeder)) {
                throw new InvalidDependency(dependency);
            }

            prev = _.concat(prev, this.addSeeder(seeder, componentName, dependency.model));

            return prev;
        }, []);
    }

    private generateExecutions(seedersList: Array<any>): Array<any> {
        return _.map(seedersList, (seeder) => seeder);
    }
}
