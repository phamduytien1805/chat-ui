import { AxiosRequestConfig } from "axios";
import { AuthService } from "../auth"
import { sessionLib, useSession } from "@/shared/session";
import { api } from "..";

interface RetryQueueItem {
    resolve: (value?: any) => void;
    reject: (error?: any) => void;
    config: AxiosRequestConfig;
  }
class TokenService  {
    private refreshAndRetryQueue: RetryQueueItem[] = [];
    private isRefreshing = false
    async retry(config: AxiosRequestConfig) {
        if(!this.isRefreshing) {
            this.isRefreshing = true
            try {
                const {data} = await AuthService.requestTokenMutation()
                console.log('sessionLib.transformUserAuthenticatedDtoToSession(data) :>> ', sessionLib.transformUserAuthenticatedDtoToSession(data),useSession);
                const { setSession ,getSession} = useSession();
                setSession(sessionLib.transformUserAuthenticatedDtoToSession(data))
                console.log('get :>> ', getSession());
                return api.request(config)
            } catch (error) {
                return Promise.reject(error)
            }
            finally {
                this.isRefreshing = false
                // Retry all requests in the queue with the new token
                this.refreshAndRetryQueue.forEach(({ config, resolve, reject }) => {
                    api
                    .request(config)
                    .then((response) => resolve(response))
                    .catch((err) => reject(err));
          });

            }
        }
        return new Promise((resolve, reject) => {
            this.refreshAndRetryQueue.push({ resolve, reject, config })
        })
      }
}

export const TokenServiceInstance = new TokenService()