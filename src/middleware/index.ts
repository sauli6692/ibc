import Request from '../domain/Request';
import Response from '../domain/Response';

export default (app: any): void => {
	app.use((req: Request, res: Response, next: Function) => {
		console.log('middleware setup works');
		next();
	});
};
