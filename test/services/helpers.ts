import * as lodash from 'lodash';

export default {
    getById(mockData: Array<any>, id: number, idField?: string) {
        return lodash.find(mockData, (o: any) => o[idField || 'id'] === id);
    },
    setCRUDSpies(Model: any, mockData: Array<any>) {
        spyOn(Model, 'count').and.returnValue(Promise.resolve(mockData.length));

        spyOn(Model, 'findAll').and.callFake((params: any) => {
            let id = lodash.isInteger(params.where.id) || lodash.isNil(params.where.id) ? params.where.id : params.where.id.$in[0];

            if (lodash.isNil(id)) {
                return Promise.resolve(mockData);
            }
            let result = lodash.filter(mockData, (o) => o.id === id);

            return Promise.resolve(result);
        });
        spyOn(Model, 'create').and.callFake((data: any) => {
            let id = mockData[mockData.length - 1].id + 1;
            data.id = id;
            mockData.push(data);
            let result = Model.build(data);
            return Promise.resolve(result);
        });
        spyOn(Model, 'findById').and.callFake((id: number, options: any) => {
            let index = lodash.findIndex(mockData, c => c.id === id);
            let item: any = mockData[index];
            let instance = Model.build(item);
            spyOn(instance, 'update').and.callFake((data: any, options: any) => {
                mockData[index] = lodash.assign(item, data);
                mockData[index].id = id;
                return Promise.resolve(Model.build(mockData[index]));
            });
            return Promise.resolve(instance);
        });
        spyOn(Model, 'update').and.callFake((data: any, options: any) => {
            let item = this.getById(mockData, options.where.id);

            lodash.forIn(data, (value, key) => {
                item[key] = lodash.isNil(value) ? item[key] : value;
            });

            return Promise.resolve([item]);
        });
        spyOn(Model, 'destroy').and.callFake((options: any) => {
            let id = options.where.id;
            let index = lodash.findIndex(mockData, c => c.id === id);
            let item = this.getById(mockData, id);
            mockData.splice(index, 1);
            return Promise.resolve(item);
        });
    }
};
