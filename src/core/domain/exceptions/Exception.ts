import * as _ from 'lodash';

export class Exception extends Error {
    public toJSON(): any {
        let json = {
            name: this.constructor.name,
            message: this.message
        };

        _.forOwn(this, (property, key) => {
            json[key] = property;
        });
        return json;
    }
}
