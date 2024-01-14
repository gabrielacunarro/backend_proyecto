function propsUsers(req, res, next) {
    // Verifica si la solicitud es para la eliminación por ID (o cualquier otra operación que no requiera cuerpo)
    if (req.method === 'DELETE' || req.method === 'GET') {
        // Si es una solicitud de eliminación o GET, permite pasar sin validación
        return next();
    }

    // Validación normal para otras rutas y métodos
    const { name, photo, email } = req.body;

    const missingProps = [];

    if (!name) missingProps.push('name');
    if (!photo) missingProps.push('photo');
    if (!email) missingProps.push('email');

    if (missingProps.length > 0) {
        return res.json({
            statusCode: 400,
            message: `${req.method} ${req.originalUrl} name, photo, and email are required`
        });
    }

    next();
}

export default propsUsers;




