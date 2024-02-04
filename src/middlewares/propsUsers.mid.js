import propsUsersUtils from "../utils/propsUsers.mid.js";

function propsUsers(req, res, next) {
    if (req.method === 'DELETE' || req.method === 'GET') {
        return next();
    }

    try {
        propsUsersUtils(req.body, req.method, req.originalUrl);
        return next();
    } catch (error) {
        console.error('propsUsers error:', error);
        return next(error);
    }
}

export default propsUsers;




