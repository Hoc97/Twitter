import 'dotenv/config'
import express from 'express'
import { defaultErrorHandler } from '~/middlewares/errors.middlewares'
import mediaRouter from '~/routes/medias.routes'
import staticRouter from '~/routes/statics.routes'
import usersRouter from '~/routes/users.routes'
import databaseService from '~/services/database.services'
import { initFolder } from './utils/file'
import { UPLOAD_VIDEO_TEMP_DIR } from './constants/dir'
const app = express()
const port = process.env.PORT || 8081

// Tạo folder upload nếu chưa có
initFolder()

databaseService.connect()
app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/medias', mediaRouter)
app.use('/static', staticRouter)
app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
