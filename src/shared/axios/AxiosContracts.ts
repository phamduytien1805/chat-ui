import { AxiosHeaders, AxiosResponse } from 'axios'
import { z, ZodType } from 'zod'
import { AxiosValidationError } from './AxiosValidationError'
import { RESP_CODE } from '../lib/enum'

type ResponseApi = {
  code: RESP_CODE,
  data: any,
}
export class AxiosContracts {
  static responseContract<Data>(schema: ZodType<Data>) {
    return (response: AxiosResponse<ResponseApi>): AxiosResponse<Data> => {
      const validation = schema.safeParse(response.data.data)

      if (validation.error) {
        throw new AxiosValidationError(
          response.config,
          response.request,
          response,
          validation.error.errors,
        )
      }

      return { ...response, data: validation.data }
    }
  }

  static requestContract<Data>(schema: ZodType<Data>, data: unknown) {
    const validation = schema.safeParse(data)

    if (validation.error) {
      throw new AxiosValidationError(
        { headers: new AxiosHeaders() },
        undefined,
        undefined,
        validation.error.errors,
      )
    }

    return validation.data
  }
}
