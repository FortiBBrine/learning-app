interface ApiError<T = Record<string, string>> {
    type: string;
    message: string;
    status: number;
    path: string;
    timestamp: string;
    data?: T;
}

/*
interface ValidationError extends ApiError<{ username?: string; password?: string }> {
    type: 'VALIDATION_ERROR';
}
 */

interface ErrorResponse<T extends ApiError = ApiError> {
    error: T;
}
