import { z } from "zod";

const checkValidUrl = /^(https?|ftp):\/\/[^\s\/$.?#].[^\s]*$/;
const checkSafePassword =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const LinkSchema = z.object({
  original: z
    .string()
    .trim()
    .min(1, {
      message: "Field can't be empty",
    })
    .regex(checkValidUrl, {
      message: "Please provide a valid url. ",
    }),
  short: z
    .string()
    .min(5, {
      message: "Short link must have at least 5 characters",
    })
    .max(10, {
      message: "A short link can't exceed 10 characters",
    }),
});

export const userSchema = z.object({
  email: z.string().email(),
  password: z.string().regex(checkSafePassword, {
    message:
      "password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and have at least 8 characters.",
  }),
});

export const GroupSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: "Name of the group must have at least 3 characters" }),
  description: z.string(),
});
