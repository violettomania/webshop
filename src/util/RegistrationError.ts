import { SerializedError } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { RegistrationErrorResponse } from '../state/actions/registerUser';

export class RegistrationError extends Error implements SerializedError {
  constructor(public originalError: RegistrationErrorResponse) {
    super(
      JSON.stringify(
        originalError.details?.errors?.map((error) => error.message) || [
          originalError.message,
        ]
      )
    );
  }
}
