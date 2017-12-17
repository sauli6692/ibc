import * as lodash from 'lodash';
import * as Errors from 'feathers-errors';

import { BaseCustomService, IService } from '../../../core/domain/services';
import { seeders } from '../../../core/seeders';
import { InvalidDependency } from '../../../core/domain/exceptions';

export class InstallerService extends BaseCustomService implements IService {
    private models: Array<any>;
    private errors: Array<any>;

    constructor(component: string, app: any) {
        super(component, app);
        this.errors = [];
    }

    public afterInit(): void {
        this.models = this.app.getModels();
    }

    protected define() {
        return {
            route: 'install',
            authenticate: false
        };
    }

    public find(params: any): Promise<any> {
        return Promise.resolve({
            results: this.joinSeeders(),
            errors: this.errors
        });
    }

    private joinSeeders(): Array<any> {
        let result: Array<any> = [];

        lodash.forOwn(seeders, (component, componentName) => {
            lodash.forOwn(component, (seeder: any, model: string) => {
                    result = lodash.concat(result, this.addSeeder(seeder, componentName, model));
            });
        });

        return result;
    }

    private addSeeder(seeder: any, component: string, model: string): Array<any> {
        let result: Array<any> = [];

        if (!seeder.added) {
            try {
                let dependencies = this.getDependencies(component, model, seeder.dependencies);
                result = lodash.concat(result, dependencies);

                seeder.model = model;
                seeder.added = true;
                result.push(seeder);
            } catch (e) {
                if (!seeder.dependencyError) {
                    let error = {};
                    if (e instanceof InvalidDependency) {
                        error = lodash.assign({
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
        if (lodash.isNil(dependencies)) return [];

        return lodash.reduce(dependencies, (prev, dependency: any) => {
            let componentName = dependency.component || component;
            let componentSeeder = seeders[componentName];

            if (lodash.isNil(componentSeeder)) {
                throw new InvalidDependency(dependency);
            }

            let seeder = componentSeeder[dependency.model];

            if (lodash.isNil(seeder)) {
                throw new InvalidDependency(dependency);
            }

            prev = lodash.concat(prev, this.addSeeder(seeder, componentName, dependency.model));

            return prev;
        }, []);
    }
}
