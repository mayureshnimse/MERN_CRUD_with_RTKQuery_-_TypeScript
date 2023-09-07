//const mongoose = require('mongoose')
import mongoose, { Schema, Document } from 'mongoose';

interface IProduct extends Document {      // interface
    name: String;
    email: String;
    contact: String;
}


const productSchema = new Schema<IProduct>(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        contact: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

// const Product = mongoose.model<IProduct>('Product', productSchema)

// module.exports = Product

export default mongoose.model<IProduct>('Product', productSchema);
