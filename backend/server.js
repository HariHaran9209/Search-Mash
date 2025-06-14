import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

import productRouter from './routes/Product.route.js'

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log(`MongoDB Connected`))
.catch(error => console.log(`MongoDB Connection Error: ${error}`))

app.use('/api/products', productRouter)

const PORT = 5000
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`))
