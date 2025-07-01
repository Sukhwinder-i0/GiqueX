class ApiError extends Error {
  statusCode: number;
  success: false;
  data: null;
  errors: unknown[];
  stack?: string;

    constructor(
        statusCode: number,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors

        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }

    } 
}

export default ApiError 