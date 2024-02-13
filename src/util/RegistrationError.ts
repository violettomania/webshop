import { SerializedError } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { ErrorResponse } from "../actions/registerUser";

export class RegistrationError extends Error implements SerializedError {
    constructor(public originalError: ErrorResponse) {
        super(JSON.stringify(originalError.details?.errors?.map(error => error.message) || [originalError.message]));
    }
}
