import { HttpStatusCode } from "axios";
import { PageErrorProps } from "./page-error.ui";
import { redirect } from "react-router-dom";
import { pathKeys } from "@/shared/lib/react-router";

 class PageErrorModel {
     getPageErrorProps(code : HttpStatusCode) : PageErrorProps {
      console.log('code :>> ', code);
      switch (code) {
        case HttpStatusCode.NotFound:
          return {
            title: code.toString(),
            description: "Looks like you've ventured into the unknown digital realm.",
            btn: {
              label: 'Return to dashboard',
              onClick: () => {
                redirect(pathKeys.home())
              },
            },
          }
          case HttpStatusCode.Unauthorized:
            return {
              title: code.toString(),
              description: "Oops! It looks like you don't have permission to view this page.\nYou may need to log in to your account or verify your credentials.",
              btn: {
                label: 'Go to Login',
                onClick: () => {
                  redirect(pathKeys.login())
                },
              },
            }
        default:
          return {
            title: '500',
            description: 'An error occurred. Please try again later.',
            btn: {
                label: 'Try again',
                onClick: () => {
                    redirect(pathKeys.home())
                },
            }
          }
      }
    }
  }
  
  export const pageError = new PageErrorModel()
