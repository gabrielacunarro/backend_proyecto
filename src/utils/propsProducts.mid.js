function propsProductsUtils(data, method, originalUrl) {
    const { title, description, photo, price, stock } = data;
    const missingProps = [];

    if (!title) missingProps.push('title');
    if (!description) missingProps.push('description');
    if (!photo) missingProps.push('photo');
    if (!price) missingProps.push('price');
    if (!stock) missingProps.push('stock');

    if (missingProps.length > 0) {
        throw {
            statusCode: 400,
            message: `${method} ${originalUrl} ${missingProps.join(', ')} are required`,
        };
    }
}

export default propsProductsUtils;
