import { z } from 'zod'

const MIN_PASSWORD_LENGTH = 8
const MIN_USERNAME_LENGTH = 2
const MAX_USERNAME_LENGTH = 32

export const UserDtoSchema = z.object({
  id: z.string(),
  email: z.string(),
  email_verified: z.boolean(),
  username: z.string(),
})

export const UserAuthenticatedDtoSchema = z.object({
  access_token: z.string(),
  user: UserDtoSchema,
})

export const UpdateUserDtoSchema = z
  .object({
    email: z.string().email().optional().or(z.literal('')),
    username: z.string().min(MIN_USERNAME_LENGTH).max(MAX_USERNAME_LENGTH).optional().or(z.literal('')),
    password: z.string().min(MIN_PASSWORD_LENGTH).optional().or(z.literal('')),
  })
  .partial()
  .refine((args) => Object.values(args).some(Boolean), {
    path: ['root'],
    message: 'One of the fields must be defined',
  })

export const CreateUserDtoSchema = z.object({
  username: z
    .string()
    .min(MIN_USERNAME_LENGTH, { message: `This must be ${MIN_USERNAME_LENGTH}-${MAX_USERNAME_LENGTH} characters.` }).max(MAX_USERNAME_LENGTH, {message: `This must be ${MIN_USERNAME_LENGTH}-${MAX_USERNAME_LENGTH} characters.`}),
  email: z.string().email({
    message:
    'This format is invalid.',
  }),
  password: z.string().min(MIN_PASSWORD_LENGTH, {
    message:
      'This must be at least 8 characters long.',
  }),
})

export const LoginUserDtoSchema = z.object({
  email: z.string().email({
    message:
      'This format is invalid.',
  }),
  password: z.string().min(MIN_PASSWORD_LENGTH, {
    message:
      'This must be at least 8 characters long.',
  }),
})
