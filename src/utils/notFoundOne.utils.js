function notFoundOne(one) {
    if (!one) {
        const error = new Error("Product not found");
        error.statusCode = 404;
        throw error;
    }
}

export default notFoundOne;
