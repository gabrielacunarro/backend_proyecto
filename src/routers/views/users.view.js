import { Router } from "express";

import usersManager from "../../data/fs/userFS.js"

const usersRouter = Router()

usersRouter.use("/profile", (req,res,next)=>{
    try {
        const one = usersManager.readOne("54c6dcc3")
        return res.render('layouts/profile.handlebars', {one});
    } catch (error) {
        next(error)
    }
});

export default usersRouter