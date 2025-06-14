import express from 'express'
import Product from '../models/Product.model.js'

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const products = await Product.find()
        res.json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/search', async (req, res) => {
    try {
        const { filters } = req.body
        let query = {}

        console.log(`Received filters: ${filters}`)

        if (filters) {
            Object.keys(filters).forEach(key => {
                if(filters[key].min !== undefined || filters[key].max !== undefined) {
                    query[key] = {}
                    if (filters[key].min !== undefined) {
                        query[key].$gte = filters[key].min
                    }
                    if (filters[key].max !== undefined) {
                        query[key].$lte = filters[key].max
                    }
                } else if (typeof filters[key] === 'string') {
                    query[key] = { $regex: filters[key], $options: 'i' }
                }
            })
        }

        console.log(`MongoDB Query: ${query}`)

        const products = await Product.find(query)
        res.json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    const product = new Product(req.body)
    try {
        const newProduct = await product.save()
        res.status(201).json(newProduct)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

export default router