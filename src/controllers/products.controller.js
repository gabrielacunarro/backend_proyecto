import productsServices from "../services/products.services.js"

class ProductsController {
    constructor() {
        this.service = productsServices;
    }
    create = async (req, res, next) => {
        try {
            const data = req.body;
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
                limit: req.query.limit || 4,
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
            const all = await this.service.read({ filter, orderAndPaginate });
            if (all) {
                return res.success200(all);
            }
            return res.error404(all)
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
                return res.error404(response)
            }
        } catch (error) {
            return next(error);
        }
    };

    update = async (req, res, next) => {
        try {
            const { pid } = req.params;
            const data = req.body;

            const updatedProduct = await this.service.update(pid, data);

            if (updatedProduct) {
                return res.success200(`Product with ID ${pid} has been successfully updated.`);
            } else {
                return res.error404(`Product with ID ${pid} not found. No product has been updated.`);
            }
        } catch (error) {
            return next(error);
        }
    };

    destroy = async (req, res, next) => {
        try {
            const { pid } = req.params;
            const deletedProduct = await this.service.destroy(pid);

            if (deletedProduct) {
                return res.success200(`Product with ID ${pid} has been successfully deleted.`);
            } else {
                return res.error404(`Product with ID ${pid} not found. No product has been deleted.`);
            }

        } catch (error) {
            return next(error);
        }
    }
}

export default ProductsController
const controller = new ProductsController();
const { create, read, readOne, update, destroy } = controller
export { create, read, readOne, update, destroy }