export interface Request extends Express.Request {
	body: any;
	params: any;
	query: any;
	method: any;
	path: any;
	url: string;
	files: any;
	originalUrl: string;
	session: any;
	isAuthenticated: Function;
}
