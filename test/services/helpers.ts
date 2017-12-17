import * as _ from 'lodash';

export default {
    getById(mockData: Array<any>, id: number, idField?: string) {
        return _.find(mockData, (o: any) => o[idField || 'id'] === id);
    },
    setCRUDSpies(Model: any, mockData: Array<any>, idField?: string) {
        spyOn(Model, 'count').and.returnValue(Promise.resolve(mockData.length));

        spyOn(Model, 'findAll').and.callFake((params: any) => {
            let id = _.isInteger(params.where[idField || 'id']) || _.isNil(params.where[idField || 'id']) ? params.where[idField || 'id'] : params.where[idField || 'id'].$in[0];

            if (_.isNil(id)) {
                return Promise.resolve(mockData);
            }
            let result = _.filter(mockData, (o) => o[idField || 'id'] === id);

            return Promise.resolve(result);
        });
        spyOn(Model, 'create').and.callFake((data: any) => {
            let id = mockData[mockData.length - 1][idField || 'id'] + 1;
            data[idField || 'id'] = id;
            mockData.push(data);
            let result = Model.build(data);
            return Promise.resolve(result);
        });
        spyOn(Model, 'findById').and.callFake((id: number, options: any) => {
            let index = _.findIndex(mockData, c => c[idField || 'id'] === id);
            let item: any = mockData[index];
            let instance = Model.build(item);
            spyOn(instance, 'update').and.callFake((data: any, options: any) => {
                mockData[index] = _.assign(item, data);
                mockData[index][idField || 'id'] = id;
                return Promise.resolve(Model.build(mockData[index]));
            });
            return Promise.resolve(instance);
        });
        spyOn(Model, 'update').and.callFake((data: any, options: any) => {
            let item = this.getById(mockData, options.where[idField || 'id'], idField);

            _.forIn(data, (value, key) => {
                item[key] = _.isNil(value) ? item[key] : value;
            });

            return Promise.resolve([item]);
        });
        spyOn(Model, 'destroy').and.callFake((options: any) => {
            let id = options.where[idField || 'id'];
            let index = _.findIndex(mockData, c => c[idField || 'id'] === id);
            let item = this.getById(mockData, id, idField);
            mockData.splice(index, 1);
            return Promise.resolve(item);
        });
    }
};
