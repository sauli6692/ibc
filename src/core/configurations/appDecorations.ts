import * as lodash from 'lodash';
import { ServiceUtils, ModelUtils } from '../utils/globals';

export default function() {
    const app = this;

    app.getService = ServiceUtils.getService(app);
    app.getModel = ModelUtils.getModel(app);
    app.getModels = ModelUtils.getModels(app);
}
