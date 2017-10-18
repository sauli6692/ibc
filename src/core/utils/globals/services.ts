export const ServiceUtils: any = {
    getService(app: any) {
        return (component: string, service: string) => {
            return app.service(`/${component}/${service}`);
        };
    }
};
