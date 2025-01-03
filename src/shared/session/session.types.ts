import { z } from 'zod'
import { SessionSchema, UserInfoSchema, UserSessionSchema } from './session.contracts'

export type UserInfo = z.infer<typeof UserInfoSchema>
export type UserSession = z.infer<typeof UserSessionSchema>
export type Session = z.infer<typeof SessionSchema>
