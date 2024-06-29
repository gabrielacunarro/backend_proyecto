import { Router } from "express";

const thanksViewRouter = Router();

thanksViewRouter.get('/thanks', (req, res) => {
    res.render('layouts/thanks');
});

export default thanksViewRouter;
