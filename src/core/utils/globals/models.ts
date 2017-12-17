import * as _ from 'lodash';

export const ModelUtils: any = {
    getModel(app: any) {
        return (component: string, model: string) => {
            return app.get('sequelizeClient').models[_.lowerCase(component) + model];
        };
    },
    getModels(app: any) {
        return () => {
            return app.get('sequelizeClient').models;
        };
    }
};
