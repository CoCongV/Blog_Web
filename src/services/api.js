/**
 * Created by lvcong on 17-6-5.
 */
export default {
  login: '/api/v1/user/login/',
  user: '/api/v1/user/',
  userProfile: '/api/v1/user/profile/',
  userAvatarUpload: '/api/v1/user/photo/',
  permission: '/api/v1/user/permission',
  // post api
  post: '/api/v1/post/:id/',
  posts: '/api/v1/post/list/',
  postSearch: '/api/v1/post/search/',
  postImgUpload: '/api/v1/post/photo/',
  tag: '/api/v1/post/tag/',
  time: '/api/v1/post/time/',
  comment: '/api/v1/comment/',
  token: '/api/v1/auth/token/',
  emailAuth: '/api/v1/auth/send_email_auth/',
  password: '/api/v1/auth/password/',
  postPermission: '/api/v1/auth/post_permission/',
  emailExist: '/api/v1/auth/email_exist/',
  usernameExist: '/api/v1/auth/username_exist/'
}
