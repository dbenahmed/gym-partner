export class HttpError extends Error {
    status;
    constructor(status, message) {
        super(message);
        this.status = status;
        this.name = "HttpError";
    }
}
export class BadRequestError extends HttpError {
    constructor(message) {
        super(400, message);
    }
}
export class UnauthorizedError extends HttpError {
    constructor(message) {
        super(401, message);
    }
}
export class ForbiddenError extends HttpError {
    constructor(message) {
        super(403, message);
    }
}
export class NotFoundError extends HttpError {
    constructor(message) {
        super(404, message);
    }
}
export class ConflictError extends HttpError {
    constructor(message) {
        super(409, message);
    }
}
export class InternalServerError extends HttpError {
    constructor(message) {
        super(500, message);
    }
}
export class ServiceUnavailableError extends HttpError {
    constructor(message) {
        super(503, message);
    }
}
export class GatewayTimeoutError extends HttpError {
    constructor(message) {
        super(504, message);
    }
}
export class NotImplementedError extends HttpError {
    constructor(message) {
        super(501, message);
    }
}
export class PayloadTooLargeError extends HttpError {
    constructor(message) {
        super(413, message);
    }
}
export class UnsupportedMediaTypeError extends HttpError {
    constructor(message) {
        super(415, message);
    }
}
export class NotAcceptableError extends HttpError {
    constructor(message) {
        super(406, message);
    }
}
export class RequestTimeoutError extends HttpError {
    constructor(message) {
        super(408, message);
    }
}
export default {
    HttpError,
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    ConflictError,
    InternalServerError,
    ServiceUnavailableError,
    GatewayTimeoutError,
    NotImplementedError,
    PayloadTooLargeError,
    UnsupportedMediaTypeError,
    NotAcceptableError,
    RequestTimeoutError,
};
