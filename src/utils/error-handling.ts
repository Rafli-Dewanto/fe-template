import { AxiosError } from "axios";

import { toast } from "@/hooks/use-toast";

export interface ErrorResponse {
  message: string;
  code?: string;
  // Fix 1: Use 'unknown' instead of 'any' for unknown structures
  details?: Record<string, unknown>;
}

export class AppError extends Error {
  code?: string;
  // Fix 2: Update property type
  details?: Record<string, unknown>;

  // Fix 3: Update constructor argument type
  constructor(message: string, code?: string, details?: Record<string, unknown>) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.details = details;
  }
}

export const handleApiError = (error: unknown): AppError => {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof AxiosError) {
    const response = error.response?.data as ErrorResponse | undefined;
    return new AppError(
      response?.message || "An unexpected error occurred",
      response?.code || error.code,
      response?.details
    );
  }

  if (error instanceof Error) {
    return new AppError(error.message);
  }

  return new AppError("An unexpected error occurred");
};

export const showErrorToast = (error: unknown) => {
  const appError = handleApiError(error);
  toast({
    variant: "destructive",
    title: "Error",
    description: appError.message,
  });
};

export const validateRequired = <T>(value: T | null | undefined, fieldName: string): T => {
  if (value === null || value === undefined) {
    throw new AppError(`${fieldName} is required`);
  }
  return value;
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return passwordRegex.test(password);
};
