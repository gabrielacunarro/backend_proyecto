function notFoundOne(one) {
    if (!one) {
        const error = new Error("There isn't any products")
        error.statusCode = 404
        throw error;
    }
}