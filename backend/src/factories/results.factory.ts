interface IResult {
	successed: boolean;
	failed: boolean;
	message: string;
}

class Result implements IResult {

	constructor(successed: boolean, data: any, message: string) {
		this.successed = successed;
		this.failed = !successed;
		this.message = message;
		this.data = data;
	}

	successed: boolean;
	failed: boolean;
	message: string;
	data: any;

	static Success(data: any, message = ''): IResult {
		const result = new Result(true, data, message);

		if (!result.message) {
			delete result.message;
		}

		return result;
	}

	static Fail(data: any, message = ''): IResult {
		const result = new Result(false, data, message);

		if (!result.message) {
			delete result.message;
		}

		return result;
	}
}

export default Result;