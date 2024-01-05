import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

class ProductManager {
    static #productsFile = 'data/fs/files/products.json';
    static #products = [];

    constructor() {
        this.checkAndCreateDataFolder();
        this.loadProducts();
    }

    #verifyRequiredProps(data) {
        const requiredProps = ["title", "photo", "price", "stock"];
        const missingProps = requiredProps.filter(prop => !(prop in data));
        return missingProps;
    }

    #generateProductId() {
        const idGenerator = crypto.randomBytes(4).toString('hex'); // 8 caracteres hexadecimales
        return idGenerator;
    }

    #generateWarningMessage(missingProps, title) {
        const missingMessages = missingProps.map(prop => `The product has not been created as the "${prop}" property is missing for "${title}".`);
        return `Warning: ${missingMessages.join(". ")}`;
    }

    // Método para constatar si la datafolder existe o no
    async checkAndCreateDataFolder() {
        const dataFolder = path.dirname(ProductManager.#productsFile);

        try {
            // Intenta acceder a la carpeta
            await fs.promises.access(dataFolder);
        } catch (error) {
            // Si la carpeta no existe, la crea
            try {
                await fs.promises.mkdir(dataFolder, { recursive: true });
            } catch (mkdirError) {
                console.error('Error creating folder:', mkdirError.message);
            }
        }
    }


    //metodo de creacion de productos
    // método de creación de productos
    async create(data) {
        const missingProps = this.#verifyRequiredProps(data);

        if (missingProps.length > 0) {
            console.log(this.#generateWarningMessage(missingProps, data.title));
            return null; // Devuelve null si faltan propiedades
        }

        try {
            const id = this.#generateProductId();

            const product = {
                id,
                title: data.title,
                photo: data.photo,
                price: data.price,
                stock: data.stock
            };

            ProductManager.#products.push(product);

            // Guardar los productos y obtener la lista actualizada después de la operación
            const updatedProducts = await this.saveProducts();

            return id;
        } catch (error) {
            console.error(`Error al guardar productos: ${error.message}`);
            return null; 
        }
    }

    // Método para la carga de productos
    async loadProducts() {
        try {
            const data = await fs.promises.readFile(ProductManager.#productsFile, 'utf8');
            ProductManager.#products = JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT' || error.message === 'Unexpected end of JSON input') {
                // Si el archivo no existe o está vacío, inicializo #products como un array vacío
                ProductManager.#products = [];
            } else {
                console.error('Error loading products:', error.message);
            }
        }
    }

    // método para guardado de productos
    async saveProducts() {
        try {
            const data = JSON.stringify(ProductManager.#products, null, 2);
            await fs.promises.writeFile(ProductManager.#productsFile, data, { encoding: 'utf8' });
            return ProductManager.#products; // Devolver la lista actualizada después de guardarlos
        } catch (error) {
            console.error('Error saving products:', error.message);
            throw error; // Re-lanzar el error para manejarlo en el llamador si es necesario
        }
    }

    //metodo para elimiar un producto
    destroy(id) {
        const productIndex = ProductManager.#products.findIndex(product => product.id === id);

        if (productIndex !== -1) {
            ProductManager.#products.splice(productIndex, 1);
            this.saveProducts(); 
            return true; 
        } else {
            return false; 
        }
    }

    //método para leer los productos
    async read() {
        try {
            const products = fs.readFileSync(ProductManager.#productsFile, 'utf-8');
            return JSON.parse(products);
        } catch (error) {
            throw new Error(`Error reading products: ${error.message}`);
        }
    }


    readOne(id) {
        const product = ProductManager.#products.find(product => product.id === id);

        if (!product) {
            console.log(`Product with ID ${id}: not found!`);
        }

        return product || null;
    }

}

export default ProductManager;


















