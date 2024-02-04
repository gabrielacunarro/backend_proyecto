function propsUsersUtils(data, method, originalUrl) {
    const { name, photo, email } = data;
    const missingProps = [];

    if (!name) missingProps.push('name');
    if (!photo) missingProps.push('photo');
    if (!email) missingProps.push('email');

    if (missingProps.length > 0) {
        throw {
            statusCode: 400,
            message: `${method} ${originalUrl} ${missingProps.join(', ')} are required`,
        };
    }
}

export default propsUsersUtils;




