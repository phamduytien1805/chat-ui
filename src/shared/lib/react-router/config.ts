import { SlugPageParams } from './react-router.types'

export const pathKeys = {
  root: '/',
  login() {
    return pathKeys.root.concat('login/')
  },
  register() {
    return pathKeys.root.concat('register/')
  },
  home() {
    return pathKeys.root
  },
  accountVerification() {
    return pathKeys.root.concat('verification/')
  },
  error: {
    root() {
      return pathKeys.root.concat('error/')
    },
    page404() {
      return pathKeys.error.root().concat('404/')
    },
    page401() {
      return pathKeys.error.root().concat('401/')
    }
  }
  // article: {
  //   root() {
  //     return pathKeys.root.concat('article/')
  //   },
  //   bySlug({ slug }: SlugPageParams) {
  //     return pathKeys.article.root().concat(slug, '/')
  //   },
  // },
}
