const errorHandler = (error, req, res, next) => {
    console.error(error);

    // Agregamos un console.log para imprimir detalles adicionales del error
    console.log("Error Details:", error);

    return res.json({
        statusCode: error.statusCode || 500,
        message: `${req.method} ${req.url} ${error.message}`,
        errorDetails: error,
    });
};

export default errorHandler;

