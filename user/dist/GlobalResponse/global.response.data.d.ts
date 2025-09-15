export declare class GlobalResponseData<D> {
    result: D | D[];
    message: string;
    httpStatusCode: number;
    constructor(result: D | D[], message: string, httpStatusCode: number);
}
