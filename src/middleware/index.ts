import { Request } from '../core/domain/http/Request';
import { Response } from '../core/domain/http/Response';

export default function() {
    const app = this;

	app.use((req: Request, res: Response, next: Function) => {
		console.log('middleware setup works');
		next();
	});
}
