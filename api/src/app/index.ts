import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import requiresAuth from '../middlewares/auth'
import { AuthService, ItemService } from './services'

const app = express()
app.use(cors())
app.use(bodyParser.json())

app.use('/auth', AuthService.setupRouter())
app.use('/items', requiresAuth, ItemService.setupRouter())

export default app
