import { Exception } from './Exception';

export class InvalidDependency extends Exception {
    public dependency: string;

    constructor(dependency: any) {
        let message = `Dependency: ${dependency.component} - ${dependency.model}`;

        super(message);
        this.dependency = dependency;
    }
}
