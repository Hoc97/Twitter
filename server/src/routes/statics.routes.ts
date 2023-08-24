import { Router } from 'express'
import { serveImageController, serveVideoStreamController } from '~/controllers/medias.controllers'
import { wrapRequestHandler } from '~/utils/handlers'
const router = Router()

router.get('/image/:name', serveImageController)
router.get('/video-stream/:name', serveVideoStreamController)
// router.get('/video-stream/:name', serveVideoStreamController)
// router.get('/video-hls/:id/master.m3u8', serveM3u8Controller)
// router.get('/video-hls/:id/:v/:segment', serveSegmentController)

export default router
