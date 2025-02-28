import {ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {CommonBadRequestException} from "../exception/common.bad-request-exception";
import {CommonBusinessException} from "../exception/common.business-exception";
import {CommonErrorCode} from "../enums/common-error-code";
import {ValidationError} from "class-validator";
import {CommonValidationException} from "../exception/common.validation-exception";

@Catch()
@Injectable()
export class CustomExceptionHandler implements ExceptionFilter {

    catch(exception: any, host: ArgumentsHost) {

        const context = host.switchToHttp();
        const response = context.getResponse();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const errorCode = this.getErrorCode(exception, status);
        const errorMessage = exception.message || 'Internal server error';

        const errorResponse: { code: string; message: string } = {
            code: errorCode,
            message: errorMessage,
        };

        response.status(status).json(errorResponse);
    }

    private getErrorCode(exception: any, status: number): string {

        if (exception instanceof CommonBadRequestException) {
            return CommonErrorCode.BAD_REQUEST;
        }
        if (exception instanceof CommonBusinessException) {
            return CommonErrorCode.VALIDATION_ERROR;
        }
        if (exception instanceof ValidationError) {
            const cause = exception.contexts;
            if (cause instanceof CommonBadRequestException) {
                return CommonErrorCode.VALIDATION_ERROR;
            }
            if (cause instanceof CommonValidationException) {
                return CommonErrorCode.VALIDATION_ERROR;
            }
            return CommonErrorCode.BAD_REQUEST;
        }
        //todo: дописать
        /*if (exception instanceof CommonUnauthorizedException) {
            return CommonErrorCode.UNAUTHORIZED;
        }
        if (exception instanceof CommonForbiddenException) {
            return CommonErrorCode.FORBIDDEN;
        }*/
        return status === HttpStatus.INTERNAL_SERVER_ERROR
            ? CommonErrorCode.INTERNAL_SERVER_ERROR
            : CommonErrorCode.BAD_REQUEST;
    }
}
