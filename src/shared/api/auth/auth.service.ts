import { AxiosContracts } from '@/shared/axios'
import { api } from '../index'
import {
  CreateUserDtoSchema,
  LoginUserDtoSchema,
  UpdateUserDtoSchema,
  UserAuthenticatedDtoSchema,
  UserDtoSchema,
} from './auth.contracts'
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './auth.types'

export class AuthService {
  private static prefixUser = '/user'
  private static prefixAuth = '/auth'
  static currentUserQuery(config: { signal?: AbortSignal }) {
    return api
      .get(this.prefixUser, config)
      .then(AxiosContracts.responseContract(UserDtoSchema))
  }

  static updateUserMutation(data: { updateUserDto: UpdateUserDto }) {
    const updateUserDto = AxiosContracts.requestContract(
      UpdateUserDtoSchema,
      data.updateUserDto,
    )
    return api
      .put(this.prefixUser, { user: updateUserDto })
      .then(AxiosContracts.responseContract(UserDtoSchema))
  }

  static createUserMutation(data: { createUserDto: CreateUserDto }) {
    const createUserDto = AxiosContracts.requestContract(
      CreateUserDtoSchema,
      data.createUserDto,
    )

    return api
      .post(`${this.prefixAuth}/register`, { ...createUserDto })
      .then(AxiosContracts.responseContract(UserAuthenticatedDtoSchema))
  }

  static loginUserMutation(data: { loginUserDto: LoginUserDto }) {
    const loginUserDto = AxiosContracts.requestContract(
      LoginUserDtoSchema,
      data.loginUserDto,
    )
    return api
      .post(`${this.prefixAuth}/login`, { ...loginUserDto })
      .then(AxiosContracts.responseContract(UserAuthenticatedDtoSchema))
  }

  static requestTokenMutation() {
    return api
      .post(`${this.prefixAuth}/token`)
      .then(AxiosContracts.responseContract(UserAuthenticatedDtoSchema))
  }

  static logoutUserMutation() {
    return api.post(`${this.prefixAuth}/logout`).then(() => true)
  }

  static resendVerificationEmailMutation() {
    return api.post(`${this.prefixAuth}/resend-verification`).then(() => true)
  }

  static verifyEmailQuery(token: string,config: { signal?: AbortSignal }) {
    return api
      .post(`${this.prefixAuth}/verify-email`, { token },config)
      .then(() => true)
  }
}
