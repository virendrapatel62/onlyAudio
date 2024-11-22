import { ValidationError } from "yup";

export function toSimpleObject(error: ValidationError) {
  return error.inner.reduce((errors, error) => {
    if (!error.path) return errors;
    errors[error.path] = error.message;
    return errors;
  }, {} as Record<string, string>);
}
