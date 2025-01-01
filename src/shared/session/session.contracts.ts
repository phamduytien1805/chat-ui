import { z } from 'zod'

export const SessionSchema = z.object({
  email: z.string(),
  emailVerified: z.boolean(),
  accessToken: z.string(),
  refreshToken: z.string(),
  username: z.string(),
})
