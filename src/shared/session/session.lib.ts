import { authTypesDto } from "../api/auth"
import { Session } from './session.types';


export function transformUserDtoToSession(
  userDto: authTypesDto.UserDto,
): Session {
  return {
    email: userDto.email,
    accessToken: userDto.access_token,
    refreshToken: userDto.refresh_token,
    username: userDto.username,
    emailVerified: userDto.email_verified,
  }
}
