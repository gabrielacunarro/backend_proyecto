import CustomRouter from "../CustomRouter.js";
//import productsManager from "../../data/fs/productFS.js"
import { products } from "../../data/mongo/manager.mongo.js";
import isAdmin from "../../middlewares/isAdmin.mid.js";
import propsProducts from "../../middlewares/propsProducts.mid.js"
//ver sin funciona sin esto //import passport from "../../middlewares/passport.mid.js"
import passCb from "../../middlewares/passCb.mid.js"

export default class ProductsRouter extends CustomRouter {
    init() {
        // Endpoint para crear los productos
        this.create("/", ["ADMIN", "PREM"], passCb("jwt", { session: false }), isAdmin, propsProducts, async (req, res, next) => {
            try {
                const productData = req.body;
                const createdProduct = await products.create(productData);

                return res.success201(createdProduct);
            } catch (error) {
                console.error("Error in POST /products:", error);
                return next(error);
            }
        });
        // Endpoint para obtener la lista de productos
        this.read("/", ["PUBLIC"], async (req, res, next) => {
            try {
                const orderAndPaginate = {
                    limit: req.query.limit || 10,
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
                const all = await products.read({ filter, orderAndPaginate });

                if (all && Array.from(all.docs).length > 0) {
                    return res.success200(all)
                }
                return res.error404(all)
            } catch (error) {
                console.error(error);
                next(error);
            }
        });

        // Endpoint para obtener un producto readOne(ID)
        this.read("/:eid", ["PUBLIC"], async (req, res, next) => {
            try {
                const { eid } = req.params;
                const product = await products.readOne(eid);

                if (product) {
                    return res.success200(product)
                } else {
                    return res.error404(response)
                }
            } catch (error) {
                return next(error);
            }
        });

        // Endpoint para actualizar un producto por ID
        this.update("/:eid", ["ADMIN", "PREM"], async (req, res, next) => {
            try {
                const { eid } = req.params;
                const productData = req.body;

                const updatedProduct = await products.update(eid, productData);

                if (updatedProduct) {
                    return res.success200(`Product with ID ${eid} has been successfully updated.`);
                } else {
                    return res.error404(`Product with ID ${eid} not found. No product has been updated.`);
                }
            } catch (error) {
                return next(error);
            }
        });

        // Endpoint para eliminar un prod por ID
        this.destroy("/:pid", ["ADMIN", "PREM"], async (req, res, next) => {
            try {
                const { pid } = req.params;
                const deletedProduct = await products.destroy(pid);

                if (deletedProduct) {
                    return res.success200(`Product with ID ${pid} has been successfully deleted.`);
                } else {
                    return res.error404(`Product with ID ${pid} not found. No product has been deleted.`);
                }

            } catch (error) {
                return next(error);
            }
        });

    }
}


