import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import wordlistRouter from './wordlists/wordlists.router'

const port = 3000

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.use('/api/v1/', wordlistRouter)

app.listen(port)