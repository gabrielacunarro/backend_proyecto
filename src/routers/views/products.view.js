import { Router } from "express"
import productsManager from "../../data/fs/productFS.js"

const productsRouter = Router()

productsRouter.get("/", async (req, res, next) => {
    try {
        const all = await productsManager.read()
        return res.render('layouts/products.handlebars', { productsManager: all })
    } catch (error) {
        next(error)
    }
})
productsRouter.get("/form", async (req, res, next) => {
    try {
        return res.render("layouts/form.handlebars")
    } catch (error) {
        nexy(error)
    }
})

export default productsRouter