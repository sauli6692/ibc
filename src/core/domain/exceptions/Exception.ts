import * as lodash from 'lodash';

export class Exception extends Error {
    public toJSON(): any {
        let json = {
            name: this.constructor.name,
            message: this.message
        };

        lodash.forOwn(this, (property, key) => {
            json[key] = property;
        });
        return json;
    }
}
