import productsServices from "../services/products.services.js"
import errors from "../utils/errors/errors.js"
import customError from "../utils/errors/customError.js"
import winston from "../utils/logger/winston.utils.js"

class ProductsController {
    constructor() {
        this.service = productsServices;
    }
    create = async (req, res, next) => {
        try {
            const data = req.body;
            const userRole = req.user.role;
            const userId = req.user._id;

            const productData = {
                ...data,
                role: userRole,
                owner_id: userId
            };

            winston.INFO(JSON.stringify(productData));

            const createdProduct = await this.service.create(productData);

            return res.status(201).json({ message: 'Product created successfully', createdProduct });
        } catch (error) {
            winston.ERROR("Error POST /products:", error);
            return next(error);
        }
    };


    read = async (req, res, next) => {
        try {
            const orderAndPaginate = {
                limit: req.query.limit || 100,
                page: req.query.page || 1,
                sort: { title: 1 },
                lean: true
            }
            const filter = {}
            if (req.query.title) {
                filter.title = new RegExp(req.query.title.trim(), 'i')
            }
            if (req.query.title === "desc") {
                orderAndPaginate.sort.title = 1
            }

            if (req.query.role) {
                filter.role = req.query.role
            } else {
                filter.role = 1
            }

            const all = await this.service.read({ filter, orderAndPaginate });
            if (!all) {
                const error = customError.new(errors.notFound);
                throw error;
            }
            return res.success200(all);
        } catch (error) {
            winston.ERROR(error);
            next(error);
        }
    };


    readOne = async (req, res, next) => {
        try {
            const { pid } = req.params;
            const product = await this.service.readOne(pid);

            if (product) {
                const cleanProduct = {
                    pid: product._id,
                    title: product.title,
                    description: product.description,
                    photo: product.photo,
                    price: product.price,
                    stock: product.stock
                };

                return res.success200(cleanProduct);
            } else {
                const error = customError.new(errors.notFound);
                throw error;
            }
        } catch (error) {
            return next(error);
        }
    };

    update = async (req, res, next) => {
        try {
            const { pid } = req.params;
            const data = req.body;

            const product = await this.service.readOne(pid);
            if (!product) {
                return res.error404();
            }

            if (req.user.role !== 1) {
                if (!product.owner_id || !req.user._id.equals(product.owner_id)) {
                    return res.error403();
                }
            }

            const updatedProduct = await this.service.update(pid, data);

            if (updatedProduct) {
                return res.success200(`Product with ID ${pid} has been successfully updated.`);
            } else {
                const error = customError.new(errors.notFound);
                throw error;
            }
        } catch (error) {
            return next(error);
        }
    };


    destroy = async (req, res, next) => {
        try {
            const { pid } = req.params;

            const product = await this.service.readOne(pid);
            if (!product) {
                return res.error404();
            }

            if (req.user.role === 2 && !req.user._id.equals(product.role)) {
                return res.error403();
            }

            const deletedProduct = await this.service.destroy(pid);

            if (deletedProduct) {
                return res.success200(`Product with ID ${pid} has been successfully deleted.`);
            } else {
                const error = customError.new(errors.notFound);
                throw error;
            }
        } catch (error) {
            return next(error);
        }
    };
}

export default ProductsController
const controller = new ProductsController();
const { create, read, readOne, update, destroy } = controller
export { create, read, readOne, update, destroy }