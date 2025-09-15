"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalResponseData = void 0;
class GlobalResponseData {
    result;
    message;
    httpStatusCode;
    constructor(result, message, httpStatusCode) {
        this.result = result;
        this.httpStatusCode = httpStatusCode;
        this.message = message;
        return this;
    }
}
exports.GlobalResponseData = GlobalResponseData;
//# sourceMappingURL=global.response.data.js.map