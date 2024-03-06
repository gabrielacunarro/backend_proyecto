import { Router } from "express";

export default class CustomRouter {
    constructor() {
        this.router = Router();
        this.init();
    }
    getRouter() {
        return this.router;
    }
    init() { }
    applyCbs(cbs) {
        return cbs.map((each) => async (...params) => {
            try {
                await each.apply(this, params)
            } catch (error) {
                params[1].json({ statusCode: 500, message: error.message })
            }
        });
    }

    genericMethod(method, path, ...cbs) {
    method = method.toLowerCase(); // Convertir el método a minúsculas
    if (this.router[method]) {
        this.router[method](path, this.applyCbs(cbs));
    } else {
        console.error('Unsupported HTTP method');
    }
}

    //funcion generica tipo para los metodos 
    genericMethod(method, path, ...cbs) {
        method = method.toLowerCase(); // Convertir el método a minúsculas
        if (this.router[method]) {
            this.router[method](path, this.applyCbs(cbs));
        } else {
            console.error('Unsupported HTTP method');
        }
    }
    
    route(method, path, ...cbs) {
        this.genericMethod(method, path, ...cbs);
    }
    
}