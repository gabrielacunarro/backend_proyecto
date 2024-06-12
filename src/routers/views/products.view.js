import { Router } from "express";
import { readOne } from "../../controllers/products.controller.js";


const productsViewRouter = Router();

productsViewRouter.get("/:pid", async (req, res, next) => {
    try {
        const { pid } = req.params;
        const product = await readOne({ params: { pid } }, { success200: (data) => data });

        if (product) {
            res.render('layouts/detail', { product });
        } else {
            res.status(404).send('Product not found');
        }
    } catch (error) {
        next(error);
    }
});

export default productsViewRouter;
