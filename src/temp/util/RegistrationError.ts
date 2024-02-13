import { ErrorResponse } from "../actions/registerUser";

export class RegistrationError extends Error {
    public errorMessages: string[];
    constructor(public originalError: ErrorResponse) {
        super(originalError.message);
        if (originalError.details && originalError.details.errors) {
            this.errorMessages = originalError.details.errors.map(
                (error) => error.message || ''
            );
        } else {
            this.errorMessages = [originalError.message];
        }
    }
}
