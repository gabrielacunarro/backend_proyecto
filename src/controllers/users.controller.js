import UsersService from "../services/users.services.js"
import customError from "../utils/errors/customError.js"
import errors from "../utils/errors/errors.js"

class UsersController {
    constructor() {
        this.services = UsersService
    }

    create = async (req, res, next) => {
        try {
            const data = req.body;
            await this.services.create(data);

            return res.success201("User successfully created.", data);
        } catch (error) {
            next(error);
        }
    };

    read = async (req, res, next) => {
        try {
            const orderAndPaginate = {
                limit: req.query.limit || 10,
                page: req.query.page || 1,
                sort: { name: 1 },
                lean: true
            };
    
            const filter = {};
            
            if (req.query.email) {
                filter.email = new RegExp(req.query.email.trim(), 'i');
            }
    
            if (req.query.name === "desc") {
                orderAndPaginate.sort.name = -1;
            }
    
            const all = await this.services.read({ filter, orderAndPaginate });
    
            if (!all || all.length === 0) {
                return res.success404(all);
            }
    
            return res.success200(all);
        } catch (error) {
            winston.ERROR(error);
            next(error);
        }
    };
    
    readOne = async (req, res, next) => {
        try {
            const { uid } = req.params;
            const user = await this.services.readOne(uid);

            if (user) {
                return res.success200(user);
            } else {
                const error = customError.new(errors.notFound);
                throw error;
            }
        } catch (error) {
            next(error);
        }
    };

    update = async (req, res, next) => {
        try {
            const { uid } = req.params;
            const data = req.body;

            const isUpdated = await this.services.update(uid, data);

            if (isUpdated) {
                return res.success200(`User with ID ${uid} has been successfully updated.`);
            } else {
                const error = customError.new(errors.notFound);
                throw error;
            }
        } catch (error) {
            next(error);
        }
    };

    destroy = async (req, res, next) => {
        try {
            const { id } = req.params;
            const isDeleted = await this.services.destroy(id);

            if (isDeleted) {
                return res.success200(`User with ID ${id} has been successfully deleted.`);
            } else {
                const error = customError.new(errors.notFound);
                throw error;
            }
        } catch (error) {
            next(error);
        }
    };

    readByEmail = async (req, res, next) => {
        try {
            const { email } = req.params;
            const user = await this.services.readByEmail(email);

            if (user) {
                return res.success200(user);
            } else {
                return res.error404(`User with email ${email} not found`);
            }
        } catch (error) {
            next(error);
        }
    };

    changeUserRole = async (req, res, next) => {
        try {
            const { uid } = req.params;
            const { role } = req.body;

            if (![0, 2].includes(role)) {
                return res.error400("Invalid role. Role must be 0 for user or 2 for premium.");
            }

            const isUpdated = await this.services.changeUserRole(uid, role);

            if (isUpdated) {
                return res.success200(`User with ID ${uid} role has been successfully updated.`);
            } else {
                const error = customError.new(errors.notFound);
                throw error;
            }
        } catch (error) {
            next(error);
        }
    };
}

export default UsersController;
const controller = new UsersController();
const { create, read, readOne, update, destroy, readByEmail, changeUserRole } = controller;
export { create, read, readOne, update, destroy, readByEmail, changeUserRole };