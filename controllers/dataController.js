import Quotes from "../models/QuoteModel.js"
import Joi from "joi"
const dataController = {

    async getData(req, res, next) {

        const quote = await Quotes.findOne().sort({ _id: -1 })
        console.log(quote)
        res.json({ data: quote })

    },

    async postData(req, res, next) {

        const quoteSchema = Joi.object({
            quotes: Joi.string().required()
        })

        const { error } = quoteSchema.validate(req.body)
        if (error) {
            console.log("error in body")
            return next(error)
        }
        const quote = req.body.quotes

        console.log(quote)
        let result;
        try {

            const newQuotes = new Quotes({
                quotes: quote
            })

            result = await newQuotes.save()

            if (result) {

                console.log("result", result)
            }
        } catch (error) {
            return next(error)
        }
        res.json({ quote: result })
    },



    async updateData(req, res, next) {

        console.log(req.body)

        const id = req.body.id
        const quote = req.body.quotes
        console.log(quote)
        let doc;
        try {

            doc = await Quotes.findOneAndUpdate({ _id: id }, { $set: { quotes: quote } }, { new: true });
            doc.quotes = doc.quotes + " {updated!}"
            console.log(doc)

        } catch (error) {
            return next(error)
        }

        res.json({ quote: doc })

    }

}


export default dataController;