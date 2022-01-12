import mongoose, { Schema } from "mongoose";

const quoteSchema = new Schema({
    quotes: { type: String }
})


export default mongoose.model("Quotes", quoteSchema)