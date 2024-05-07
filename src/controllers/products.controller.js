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
            winston.INFO(JSON.stringify(data))
            const createdProduct = await this.service.create(data);

            return res.success201(createdProduct);
        } catch (error) {
            console.error("Error in POST /products:", error);
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

            if(req.query.role){
                filter.role = req.query.role
            }else{
                filter.role = 1
            }
            
            const all = await this.service.read({ filter, orderAndPaginate });
            if (!all) {
                const error = customError.new(errors.notFound);
                throw error;
            }
            return res.success200(all);
        } catch (error) {
            console.error(error);
            next(error);
        }
    };
    

    readOne = async (req, res, next) => {
        try {
            const { pid } = req.params;
            const product = await this.service.readOne(pid);

            if (product) {
                return res.success200(product)
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