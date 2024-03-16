import UsersService from "../services/users.services.js"

class UsersController {
    constructor() {
        this.services = UsersService
    }

    create = async (req, res, next) => {
        try {
            const data = req.body;
            await this.services.create(data);

            return res.success201("User successfully created.");
        } catch (error) {
            console.error(error);
            next(error);
        }
    };

    //ver order y paginado , falla el read
    read = async (req, res, next) => {
        try {
            const orderAndPaginate = {
                limit: req.query.limit || 10,
                page: req.query.page || 1,
            }
            const filter = {}
            if (req.query.email) {
                filter.email = new RegExp(req.query.email.trim(), 'i')
            }
            if (req.query.name === "desc") {
                orderAndPaginate.sort.name = 1
            }
            const all = await this.services.read({ filter, orderAndPaginate });

            if (all.length > 0) {
                return res.success200(all);
            }
            return res.error404(all);
        } catch (error) {
            console.error(error);
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
                return res.error404(`User with ID ${uid} not found`);
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
                return res.error404(`User with ID ${uid} has been successfully updated.`);
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
                return res.error404(`User with ID ${id} has been successfully deleted.`);
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
    }
}

export default UsersController;
const controller = new UsersController();
const { create, read, readOne, update, destroy, readByEmail } = controller;
export { create, read, readOne, update, destroy, readByEmail };