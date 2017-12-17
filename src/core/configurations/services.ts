import * as _ from 'lodash';
import { services } from '../../services';
import { logger } from '../utils/logger';

export default function() {
    const app = this;
	let servicesInstances = _.reduce(services, (prev: any, component: any) => {
        let componentServices = _.map(component.services, (Service: any) => new Service(component.name, app));

        return _.concat(prev, componentServices);
    }, []);

    _.forEach(servicesInstances, (service) => {
        service.afterInit();
        service.createService();
    });
}
