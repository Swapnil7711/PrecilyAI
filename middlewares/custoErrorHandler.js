class CustomErrorHandler extends Error {

    constructor(status, msg) {
        super()
        this.status = status,
            this.message = msg

    }

    static savingError(message) {
        return new CustomErrorHandler(500, message)
    }
}

export default CustomErrorHandler