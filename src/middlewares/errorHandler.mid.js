const errorHandler = (error, req, res, next) => {

    return res.json({
        statusCode: error.statusCode || 500,
        message: `${req.method} ${req.url} ${error.message}`,
        errorDetails: error,
    });
};

export default errorHandler;

