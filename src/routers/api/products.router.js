import { Router } from "express"
import { products } from "../../data/mongo/manager.mongo.js";
import isAdmin from "../../middlewares/isAdmin.mid.js";
//import productsManager from "../../data/fs/productFS.js"

const productsRouter = Router()

// Endpoint para crear los productos
productsRouter.post("/", isAdmin,async (req, res, next) => {
    try {
        const productData = req.body;
        const createdProductId = await products.create(productData);

        return res.json({
            statusCode: 201,
            response: {
                id: createdProductId,
                productData: productData,
            },
        });
    } catch (error) {
        console.error("Error in POST /products:", error);
        return next(error);
    }
});

// Endpoint para obtener la lista de productos
productsRouter.get("/", async (req, res, next) => {
    try {
        const orderAndPaginate = {
            limit: req.query.limit || 10,
            page: req.query.page || 1,
            sort: { title: 1 },
            lean: true
        }
        const filter = {}
        console.log(req.query.title)
        if (req.query.title) {
            filter.title = new RegExp(req.query.title.trim(), 'i')
        }
        if (req.query.title === "desc") {
            orderAndPaginate.sort.title = 1
        }
        const all = await products.read({ filter, orderAndPaginate });

        if (all && Array.from (all.docs).length > 0) {
            return res.json({
                statusCode: 200,
                response: all,
            });
        }
        return res.json({
            statusCode: 404,
            response: all,
        })
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// Endpoint para obtener un producto readOne(ID)
productsRouter.get("/:eid", async (req, res, next) => {
    try {
        const { eid } = req.params;
        const product = await products.readOne(eid);

        if (product) {
            return res.json({
                statusCode: 200,
                response: product,
            });
        } else {
            return res.json({
                statusCode: 404,
                response: `Product with ID ${eid} not found`,
            });
        }
    } catch (error) {
        return next(error);
    }
});

// Endpoint para actualizar un producto por ID
productsRouter.put("/:eid",isAdmin, async (req, res, next) => {
    try {
        const { eid } = req.params;
        const productData = req.body;

        const updatedProduct = await products.update(eid, productData);

        if (updatedProduct) {
            return res.json({
                statusCode: 200,
                response: `Product with ID ${eid} has been successfully updated.`,
            });
        } else {
            return res.json({
                statusCode: 404,
                response: `Product with ID ${eid} not found. No product has been updated.`,
            });
        }
    } catch (error) {
        return next(error);
    }
});

// Endpoint para eliminar un prod por ID
productsRouter.delete("/:pid", isAdmin,async (req, res, next) => {
    try {
        const { pid } = req.params;
        const deletedProduct = await products.destroy(pid);

        if (deletedProduct) {
            return res.json({
                statusCode: 200,
                response: `Product with ID ${pid} has been successfully deleted.`,
            });
        } else {
            return res.json({
                statusCode: 404,
                response: `Product with ID ${pid} not found. No product has been deleted.`,
            });
        }
    } catch (error) {
        return next(error);
    }
});

export default productsRouter;