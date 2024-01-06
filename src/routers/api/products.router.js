import { Router } from "express"
import productsManager from "../../data/fs/productFS.js"

const productsRouter = Router()

//definir los endpoints (POST GET PUT DELETE)

// Endpoint para crear los productos
productsRouter.post("/", async (req, res, next) => {
    try {
        const productData = req.body;
        const createdProductId = await productsManager.create(productData);

        return res.json({
            statusCode: 201,
            response: {
                id: createdProductId,
                productData: productData,  // Usar productData en lugar de productList
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
        const productList = await productsManager.read();

        if (productList && productList.length > 0) {
            return res.json({
                statusCode: 200,
                response: productList,
            });
        } else {
            return res.json({
                statusCode: 400,
                response: "Products not found",
            });
        }
    } catch (error) {
        return next(error);
    }
});



// Endpoint para obtener un producto readOne(ID)
productsRouter.get("/:eid", async (req, res, next) => {
    try {
        const { eid } = req.params;
        const product = productsManager.readOne(eid);

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
productsRouter.put("/:eid", async (req, res, next) => {
    try {
        const { eid } = req.params;  // Usar eid en lugar de pid
        const productData = req.body;

        const isUpdated = productsManager.update(eid, productData);

        if (isUpdated) {
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
productsRouter.delete("/:pid", async (req, res, next) => {
    try {
        const { pid } = req.params;
        const isDeleted = productsManager.destroy(pid);

        if (isDeleted) {
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