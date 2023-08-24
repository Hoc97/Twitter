import { Request } from 'express'
import path from 'path'
import sharp from 'sharp'
import { isProduction } from '~/constants/config'
import { UPLOAD_IMAGE_DIR, UPLOAD_VIDEO_DIR } from '~/constants/dir'
import { MediaType } from '~/constants/enums'
import { Media } from '~/models/Others'
import { getNameFromFullName, handleUploadImage, handleUploadVideo, removeFolder } from '~/utils/file'

class MediasService {
  async uploadImage(req: Request) {
    const files = await handleUploadImage(req)
    const result: Media[] = await Promise.all(
      files.map(async (file) => {
        const newName = getNameFromFullName(file.newFilename)
        const newPath = path.resolve(UPLOAD_IMAGE_DIR, `${newName}.jpg`)
        await sharp(file.filepath).jpeg().toFile(newPath)
        removeFolder(file.filepath)
        return {
          url: `http://${
            isProduction ? process.env.HOST : `localhost:${process.env.PORT}`
          }/static/image/${newName}.jpg`,
          type: MediaType.Image
        }
      })
    )
    return result
  }

  async uploadVideo(req: Request) {
    const file = await handleUploadVideo(req)
    const { newFilename } = file
    // const newPath = path.resolve(UPLOAD_VIDEO_DIR, `${newName}`)
    // removeFolder(file.filepath)
    return {
      url: `http://${
        isProduction ? process.env.HOST : `localhost:${process.env.PORT}`
      }/static/video-stream/${newFilename}`,
      type: MediaType.Video
    } as Media
  }
}

const mediasService = new MediasService()
export default mediasService
