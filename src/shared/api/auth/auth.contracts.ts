import { z } from 'zod'

export const UserDtoSchema = z.object({
  user: z.object({
    email: z.string(),
    token: z.string(),
    username: z.string(),
    bio: z.nullable(z.string()),
    image: z.string(),
  }),
})

export const UpdateUserDtoSchema = z
  .object({
    email: z.string().email().optional().or(z.literal('')),
    username: z.string().min(5).optional().or(z.literal('')),
    bio: z.string().optional().or(z.literal('')),
    image: z.string().optional().or(z.literal('')),
    password: z.string().min(8).optional().or(z.literal('')),
  })
  .partial()
  .refine((args) => Object.values(args).some(Boolean), {
    path: ['root'],
    message: 'One of the fields must be defined',
  })

export const CreateUserDtoSchema = z.object({
  username: z
    .string()
    .min(5, { message: 'This must be at least 5 characters long.' }),
  email: z.string().email({
    message:
    'This format is invalid',
  }),
  password: z.string().min(8, {
    message:
      'This must be at least 8 characters long. Please try again.',
  }),
})

export const LoginUserDtoSchema = z.object({
  email: z.string().email({
    message:
      'Thisformat is invalid',
  }),
  password: z.string().min(8, {
    message:
      'This must be at least 8 characters long',
  }),
})
