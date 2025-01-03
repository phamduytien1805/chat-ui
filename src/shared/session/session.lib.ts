import { authTypesDto } from '../api/auth'
import { Session, UserInfo } from './session.types'

export function transformUserDtoToSession(
  userDto: authTypesDto.UserDto,
): UserInfo {
  return {
    email: userDto.email,
    username: userDto.username,
    emailVerified: userDto.email_verified,
  }
}

export function transformUserAuthenticatedDtoToSession(
  dto: authTypesDto.UserAuthenticatedDto,
): Session {
  const userDto = dto.user
  return {
    email: userDto.email,
    username: userDto.username,
    emailVerified: userDto.email_verified,
    accessToken: dto.access_token,
    refreshToken: dto.refresh_token,
  }
}
