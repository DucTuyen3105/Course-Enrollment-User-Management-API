export class GlobalResponseData<D>{
    result: D | D[];
    message : string;
    httpStatusCode : number;
    constructor(result: D | D[], message: string, httpStatusCode: number ) {
        this.result = result;
        this.httpStatusCode = httpStatusCode;
        this.message = message;
        return this;
    }
}