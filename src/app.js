import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

// configuring all imports
const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
// sari json nhi allowed hongi wrna server hang bhi ho sakta h
app.use(express.json({limit: "16kb"}))
// for url data
app.use(express.urlencoded({extended: true, limit: "16kb"}))
// for storing public assets
app.use(express.static("public"))
// for file multer is there

app.use(cookieParser())


export {app}