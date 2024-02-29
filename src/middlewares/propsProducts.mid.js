import propsProductsUtils from "../utils/propsProducts.mid.js"

export default (req,res,next)=>{
    try {
        propsProductsUtils(req.body)
        return next()
    } catch (error) {
        return next(error)
    }
}