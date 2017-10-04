import * as lodash from 'lodash';
import services from '../../services';

export default function() {
    const app = this;
	lodash.forEach(services, component => {
        lodash.forEach(component.services, Service => {
            let newService = new Service(component.name, app);
            newService.createService();
        });
    });
}
