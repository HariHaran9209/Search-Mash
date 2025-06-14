import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    temperature: { type: Number, required: false },
    height: { type: Number, required: false },
    weight: { type: Number, required: false },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    specifications: { type: Map, of: mongoose.Schema.Types.Mixed, default: {} },
    createAt: { type: Date, default: Date.now }
})

const Product = mongoose.models.Product || mongoose.model('Product', productSchema)

export default Product