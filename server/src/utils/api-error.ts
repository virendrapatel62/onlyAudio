interface Response {
  message?: string;
  [index: string]: any;
}

export class ApiError extends Error {
  statusCode: number;
  response: Response;

  constructor(statusCode: number, response: Response) {
    super(response.message);
    this.statusCode = statusCode;
    this.response = response;
    delete response.message;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }

  static badRequest(response: Response) {
    return new ApiError(400, response);
  }

  static unauthorized(response: Response) {
    return new ApiError(401, response);
  }

  static forbidden(response: Response) {
    return new ApiError(403, response);
  }

  static notFound(response: Response) {
    return new ApiError(404, response);
  }

  static internal(response: Response) {
    return new ApiError(500, response);
  }
}
