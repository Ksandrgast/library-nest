import {CommonErrorCodeBase} from "../enums/common-error-code-base";

export interface CommonApiError {

    code: CommonErrorCodeBase;
    message: string;
}
