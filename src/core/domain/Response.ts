export interface Response extends Express.Response {
	redirect(url: string): this;
	writeHead(status: any, type: any): this;
	send(data: any): this;
	write(data: any): this;
	end(data: any): this;
	json(data: any): this;
	status(status: number): this;
}
