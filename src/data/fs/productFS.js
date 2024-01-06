import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

class ProductManager {
    static #productsFile = 'src/data/fs/files/products.json';
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
        const idGenerator = crypto.randomBytes(4).toString('hex');
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

    // método de creación de productos
    async create(data, next) {
        try {
            const missingProps = this.#verifyRequiredProps(data);

            if (missingProps.length > 0) {
                console.log(this.#generateWarningMessage(missingProps, data.title));
                return null;
            }

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
            console.error(`Error creating product: ${error.message}`);
            next(error);
            return null;
        }
    }

    // Método para la carga de productos
    async loadProducts(next) {
        try {
            const data = await fs.promises.readFile(ProductManager.#productsFile, 'utf8');
            ProductManager.#products = JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT' || error.message === 'Unexpected end of JSON input') {
                // Si el archivo no existe o está vacío, inicializo #products como un array vacío
                ProductManager.#products = [];
            } else {
                console.error('Error loading products:', error.message);
                next(error);
            }
        }
    }

    // método para guardado de productos
    async saveProducts(next) {
        try {
            const data = JSON.stringify(ProductManager.#products, null, 2);
            await fs.promises.writeFile(ProductManager.#productsFile, data, { encoding: 'utf8' });
            return ProductManager.#products; // Devolver la lista actualizada después de guardarlos
        } catch (error) {
            console.error('Error saving products:', error.message);
            next(error);
        }
    }

    //método para elimiar un producto
    destroy(id, next) {
        try {
            const productIndex = ProductManager.#products.findIndex(product => product.id === id);

            if (productIndex !== -1) {
                ProductManager.#products.splice(productIndex, 1);
                this.saveProducts().then(() => {
                    console.log(`Product with ID ${id} has been successfully destroyed.`);
                }).catch(error => {
                    console.error(`Error saving products after destroying product: ${error.message}`);
                });
                return true;
            } else {
                console.log(`Product with ID ${id} not found. No product has been destroyed.`);
                return false;
            }
        } catch (error) {
            console.error(`Error destroying product: ${error.message}`);
            next(error);
            return false;
        }
    }

    //método para leer los productos
    async read(next) {
        try {
            const data = await fs.promises.readFile(ProductManager.#productsFile, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                // Manejar el caso cuando el archivo no existe
                console.log('Products file not found. Returning an empty array.');
                return [];
            } else {
                // Re-lanzar el error si es de otro tipo
                console.error(`Error reading products: ${error.message}`);
                next(error);
                return [];
            }
        }
    }

    readOne(id, next) {
        try {
            const product = ProductManager.#products.find(product => product.id === id);

            if (!product) {
                console.log(`Product with ID ${id}: not found!`);
            }

            return product || null;
        } catch (error) {
            console.error(`Error reading product: ${error.message}`);
            next(error);
            return null;
        }
    }

    // Método de actualización de producto
    update(id, data, next) {
        try {
            if (!ProductManager.#products || ProductManager.#products.length === 0) {
                return false;
            }

            const productIndex = ProductManager.#products.findIndex(product => product.id === id);

            if (productIndex !== -1) {

                ProductManager.#products[productIndex] = { ...ProductManager.#products[productIndex], ...data };
                this.saveProducts().then(() => {
                    console.log(`Product with ID ${id} has been successfully updated.`);
                }).catch(error => {
                    console.error(`Error saving products after updating product: ${error.message}`);
                });
                return true;
            }

            return false;
        } catch (error) {
            console.error(`Error updating product: ${error.message}`);
            next(error);
            return false;
        }
    }
}

const productsManager = new ProductManager();

export default productsManager;


















