import { Request } from 'express'
import formidable, { File } from 'formidable'
import fs from 'fs'
import { isEmpty } from 'lodash'
import { UPLOAD_IMAGE_TEMP_DIR, UPLOAD_VIDEO_TEMP_DIR } from '~/constants/dir'

export const initFolder = () => {
  ;[UPLOAD_IMAGE_TEMP_DIR, UPLOAD_VIDEO_TEMP_DIR].forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {
        recursive: true // mục đích là để tạo folder nested
      })
    }
  })
}

export const getNameFromFullName = (fullname: string) => {
  const name = fullname.split('.')
  name.pop()
  return name.join('')
}

export const removeFolder = (filePath: string) => {
  fs.unlinkSync(filePath)
}

export const handleUploadImage = (req: Request) => {
  const form = formidable({
    uploadDir: UPLOAD_IMAGE_TEMP_DIR,
    maxFiles: 4,
    keepExtensions: true,
    maxFileSize: 300 * 1024, //300Kb
    maxTotalFileSize: 4 * 300 * 1024,
    filter: function ({ name, mimetype }) {
      const valid = name === 'image' && Boolean(mimetype?.includes('image/'))
      if (!valid) {
        form.emit('error' as any, new Error('File type is not valid') as any)
      }
      return valid
    }
  })
  return new Promise<File[]>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err)
      }
      if (isEmpty(files)) {
        return reject(new Error('Image is empty'))
      }
      resolve(files.image as File[])
    })
  })
}

export const handleUploadVideo = (req: Request) => {
  const form = formidable({
    uploadDir: UPLOAD_VIDEO_TEMP_DIR,
    maxFiles: 1,
    maxFileSize: 150 * 1024 * 1024, //150mb
    filter: function ({ name, mimetype }) {
      const valid = name === 'video' && Boolean(mimetype?.includes('video/') || mimetype?.includes('quicktime'))
      if (!valid) {
        form.emit('error' as any, new Error('File type is not valid') as any)
      }
      return valid
    }
  })
  return new Promise<File>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err)
      }
      if (isEmpty(files)) {
        return reject(new Error('Video is empty'))
      }
      const video = files.video[0] as File
      const ext = getExtension(video.originalFilename as string)
      fs.renameSync(video.filepath, video.filepath + '.' + ext)
      video.newFilename = video.newFilename + '.' + ext
      resolve(video as File)
    })
  })
}

export const getExtension = (fullname: string) => {
  const namearr = fullname.split('.')
  return namearr[namearr.length - 1]
}
