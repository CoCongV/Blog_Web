/**
 * Created by lvcong on 17-6-5.
 */
export var api = {
    login: '/api/v1/user/login/',
    user: '/api/v1/user/',
    blogger: '/api/v1/user/blogger/',
    userProfile: '/api/v1/user/:id/profile/',
    userComments: '/api/v1/user/comment/', // current user comment
    userAvatarUpload: '/api/v1/user/photo/',
    permission: '/api/v1/user/permission',
    // post api
    post: '/api/v1/posts/:id/',
    posts: '/api/v1/posts/',
    postSearch: '/api/v1/posts/search/',
    postImgUpload: '/api/v1/posts/photo/',
    postComments: '/api/v1/posts/:id/comments/',
    tag: '/api/v1/posts/tag/',
    time: '/api/v1/posts/time/',
    comment: '/api/v1/comment/',
    token: '/api/v1/auth/token/',
    emailAuth: '/api/v1/auth/send_email_auth/',
    password: '/api/v1/auth/password/',
    postPermission: '/api/v1/auth/post_permission/',
    emailExist: '/api/v1/auth/email_exist/',
    usernameExist: '/api/v1/auth/username_exist/',
    // Book
    books: '/api/v1/books/',
    book: '/api/v1/books/:book_id/',
    bookSearch: '/api/v1/books/search/',
    bookPush: '/api/v1/books/push/:book_id/',
  }
  