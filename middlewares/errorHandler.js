import { ValidationError } from "joi"
import CustomErrorHandler from "./custoErrorHandler"

export const errorHandler = (err, req, res, next) => {


    let statusCode = 500

    let data = {
        message: "internal server error"
    }

    if (err instanceof ValidationError) {
        statusCode = 422

        data = {
            message: err.message
        }
    }

    if (err instanceof CustomErrorHandler) {
        statusCode = 409

        data = {
            message: err.message
        }
    }
    next();

}