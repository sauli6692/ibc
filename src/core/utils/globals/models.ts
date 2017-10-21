export const ModelUtils: any = {
    getModel(app: any) {
        return (model: string) => {
            return app.get('sequelizeClient').models[model];
        };
    },
    getModels(app: any) {
        return () => {
            return app.get('sequelizeClient').models;
        };
    }
};
