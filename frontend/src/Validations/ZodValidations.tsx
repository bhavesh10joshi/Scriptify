import { z } from "zod";

// Validation schema used for the sign up form
export const SignUpValidation = z.object({
    name: z.string().min(1),
    email: z.string().includes("@"),
    Password: z.string().min(2)
});

// Validation schema used for the login form
export const LoginValidation = z.object({
    email: z.string().includes("@"),
    Password: z.string().min(2)
});
