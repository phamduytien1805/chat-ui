import { z } from 'zod'

export const UserInfoSchema = z.object({
  email: z.string(),
  emailVerified: z.boolean(),
  username: z.string(),
})
export const UserSessionSchema = z.object({
  accessToken: z.string(),
})
export const SessionSchema = z.object({}).merge(UserInfoSchema).merge(UserSessionSchema)
