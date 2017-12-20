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

        return _.reduce(seedersExecutions, (prev: any, seeder: any, i: any) =>
            prev.then(seeder).catch((e: any) => {
                let error = _.isNil(e.toJSON) ? {
                    name: e.name,
                    message: e.message
                } : e.toJSON();
                this.errors.push(error);
            })
        , Promise.resolve())
            .then(() => {
                return {
                    errors: this.errors
                };
            })
            .catch((e: any) => {
                return {
                    errors: e
                };
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
                seeder.component = component;
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
        return _.map(seedersList, (seeder: any) => {
            let Model = this.app.getModel(seeder.component, seeder.model);
            let options: any = {
                logging: true
            };
            let fields = _.reduce(_.keys(seeder.seed[0]), (prev: any, key: string) => {
                if (!Model.attributes[key].primaryKey) {
                    prev.push(Model.attributes[key].field);
                }
                return prev;
            }, []);

            if (_.isEmpty(fields)) {
                options.ignoreDuplicates = true;
            } else {
                options.updateOnDuplicate = fields;
            }

            return () => Model.bulkCreate(seeder.seed, options);
        });
    }
}
