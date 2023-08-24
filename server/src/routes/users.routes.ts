import { Router } from 'express'
import {
  changePasswordController,
  followController,
  forgotPasswordController,
  getMyProfileController,
  getProfileController,
  loginController,
  logoutController,
  oauthController,
  refreshTokenController,
  registerController,
  resendVerifyEmailController,
  resetPasswordController,
  unfollowController,
  updateProfileController,
  verifyEmailController,
  verifyForgotPasswordController
} from '~/controllers/users.controllers'
import { filterMiddleware } from '~/middlewares/common.middlewares'
import {
  accessTokenValidator,
  changePasswordValidator,
  emailVerifyTokenValidator,
  followValidator,
  forgotPasswordValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator,
  resetPasswordValidator,
  unfollowValidator,
  updateProfileValidator,
  verifiedUserValidator,
  verifyForgotPasswordTokenValidator
} from '~/middlewares/users.middlewares'
import { UpdateProfileReqBody } from '~/models/requests/User.requests'
import { wrapRequestHandler } from '~/utils/handlers'
const router = Router()

/**
 * Description. Register a new user
 * Path: /register
 * Method: POST
 * Body: { name: string, email: string, password: string, confirm_password: string, date_of_birth: ISO8601 }
 */
router.post('/register', registerValidator, wrapRequestHandler(registerController))

/**
 * Description. OAuth with Google
 * Path: /oauth/google
 * Method: GET
 * Query: { code: string }
 */
router.get('/oauth/google', wrapRequestHandler(oauthController))

/**
 * Description. Login a user
 * Path: /login
 * Method: POST
 * Body: { email: string, password: string }
 */
router.post('/login', loginValidator, wrapRequestHandler(loginController))

/**
 * Description. Logout a user
 * Path: /logout
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Body: { refresh_token: string }
 */

router.post('/logout', accessTokenValidator, refreshTokenValidator, wrapRequestHandler(logoutController))

/**
 * Description. Refresh Token
 * Path: /refresh-token
 * Method: POST
 * Body: { refresh_token: string }
 */

router.post('/refresh-token', refreshTokenValidator, wrapRequestHandler(refreshTokenController))

/**
 * Description. Verify email when user client click on the link in email
 * Path: /verify-email
 * Method: POST
 * Body: { email_verify_token: string }
 */
router.post('/verify-email', emailVerifyTokenValidator, wrapRequestHandler(verifyEmailController))

/**
 * Description. Verify email when user client click on the link in email
 * Path: /resend-verify-email
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Body: {}
 */
router.post('/resend-verify-email', accessTokenValidator, wrapRequestHandler(resendVerifyEmailController))

/**
 * Description. Submit email to reset password, send email to user
 * Path: /forgot-password
 * Method: POST
 * Body: {email: string}
 */
router.post('/forgot-password', forgotPasswordValidator, wrapRequestHandler(forgotPasswordController))

/**
 * Description. Verify link in email to reset password
 * Path: /verify-forgot-password
 * Method: POST
 * Body: {forgot_password_token: string}
 */
router.post(
  '/verify-forgot-password',
  verifyForgotPasswordTokenValidator,
  wrapRequestHandler(verifyForgotPasswordController)
)

/**
 * Description: Reset password
 * Path: /reset-password
 * Method: POST
 * Body: {forgot_password_token: string, password: string, confirm_password: string}
 */
router.post('/reset-password', resetPasswordValidator, wrapRequestHandler(resetPasswordController))

/**
 * Description: Get my profile
 * Path: /profile
 * Method: GET
 * Header: { Authorization: Bearer <access_token> }
 */
router.get('/profile', accessTokenValidator, wrapRequestHandler(getMyProfileController))

/**
 * Description: Update my profile
 * Path: /profile
 * Method: PATCH
 * Header: { Authorization: Bearer <access_token> }
 * Body: UserSchema
 */

router.patch(
  '/profile',
  accessTokenValidator,
  verifiedUserValidator,
  updateProfileValidator,
  filterMiddleware<UpdateProfileReqBody>([
    'name',
    'date_of_birth',
    'bio',
    'location',
    'website',
    'username',
    'avatar',
    'cover_photo'
  ]),
  wrapRequestHandler(updateProfileController)
)

/**
 * Description: Get user profile
 * Path: /:username
 * Method: GET
 */
router.get('/:username', wrapRequestHandler(getProfileController))

/**
 * Description: Follow someone
 * Path: /follow
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Body: { followed_user_id: string }
 */
router.post(
  '/follow',
  accessTokenValidator,
  verifiedUserValidator,
  followValidator,
  wrapRequestHandler(followController)
)

/**
 * Description: Follow someone
 * Path: /follow/user_id
 * Method: DELETE
 * Header: { Authorization: Bearer <access_token> }
 */
router.delete(
  '/follow/:user_id',
  accessTokenValidator,
  verifiedUserValidator,
  unfollowValidator,
  wrapRequestHandler(unfollowController)
)

/**
 * Description: Change password
 * Path: /change-password
 * Method: PATCH
 * Header: { Authorization: Bearer <access_token> }
 * Body: { old_password: string, password: string, confirm_password: string }
 */
router.patch(
  '/change-password',
  accessTokenValidator,
  verifiedUserValidator,
  changePasswordValidator,
  wrapRequestHandler(changePasswordController)
)

export default router
