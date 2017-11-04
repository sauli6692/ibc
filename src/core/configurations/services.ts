import * as lodash from 'lodash';
import { services } from '../../services';
import { logger } from '../utils/logger';

export default function() {
    const app = this;
	let servicesInstances = lodash.reduce(services, (prev: any, component: any) => {
        let componentServices = lodash
            .map(component.services, (Service: any) => new Service(component.name, app));

        return lodash.concat(prev, componentServices);
    }, []);

    lodash.forEach(servicesInstances, (service) => {
        service.afterInit();
        service.createService();
    });
}
