import { Router } from 'express'
import { uploadImageController, uploadVideoController } from '~/controllers/medias.controllers'
import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'
const router = Router()

router.post('/upload-image', accessTokenValidator, verifiedUserValidator, wrapRequestHandler(uploadImageController))

router.post('/upload-video', accessTokenValidator, verifiedUserValidator, wrapRequestHandler(uploadVideoController))

export default router
