export type GlobalResponseType<D> = {
    data?: D | D[];
    message?: string;
    httpStatusCode?: number;
};
