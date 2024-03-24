import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

class ProductManager {
    static #productsFile = 'src/data/fs/files/products.json';

    constructor() {
        this.checkAndCreateDataFolder();
    }

    #verifyRequiredProps(data) {
        const requiredProps = ["title", "photo", "price", "stock"];
        const missingProps = requiredProps.filter(prop => !(prop in data));
        return missingProps;
    }

    #generateProductId() {
        return crypto.randomBytes(12).toString('hex');
    }

    #generateWarningMessage(missingProps, title) {
        const missingMessages = missingProps.map(prop => `The product has not been created as the "${prop}" property is missing for "${title}".`);
        return `Warning: ${missingMessages.join(". ")}`;
    }

    async checkAndCreateDataFolder() {
        const dataFolder = path.dirname(ProductManager.#productsFile);

        try {
            await fs.access(dataFolder);
        } catch (error) {
            try {
                await fs.mkdir(dataFolder, { recursive: true });
            } catch (mkdirError) {
                console.error('Error creating folder:', mkdirError.message);
            }
        }
    }

    async create(data) {
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
                description: data.description,
                photo: data.photo,
                price: data.price,
                stock: data.stock,
                date: data.date || new Date(),
            };

            const products = await this.loadProducts();
            products.push(product);

            await this.saveProducts(products);

            return id;
        } catch (error) {
            console.error(`Error creating product: ${error.message}`);
            throw {
                statusCode: 500,
                response: {
                    message: `Error creating product: ${error.message}`,
                },
            };
        }
    };


    async loadProducts() {
        try {
            // Agrega un console.log para verificar que la función se esté ejecutando correctamente
            console.log("Cargando productos desde el sistema de archivos (FS)...");

            const data = await fs.readFile(ProductManager.#productsFile, 'utf8');

            // Agrega un console.log para verificar que el archivo se esté leyendo correctamente
            console.log("Datos del archivo JSON leídos correctamente:", data);

            return JSON.parse(data) || [];
        } catch (error) {
            if (error.code === 'ENOENT' || error.message === 'Unexpected end of JSON input') {
                return [];
            } else {
                console.error('Error al cargar productos desde el sistema de archivos (FS):', error.message);
                throw error;
            }
        }
    }


    async saveProducts(products) {
        try {
            const data = JSON.stringify(products, null, 2);
            await fs.writeFile(ProductManager.#productsFile, data, { encoding: 'utf8' });
        } catch (error) {
            console.error('Error saving products:', error.message);
            throw error;
        }
    }

    async read({ filter, orderAndPaginate }) {
        try {
            let products = await this.loadProducts();
            console.log("Productos cargados desde el sistema de archivos (FS):", products);

            // Filtrar los productos si se proporciona un filtro
            if (filter && filter.title) {
                products = products.filter(product => product.title.includes(filter.title));
            }

            // Ordenar los productos si se proporciona un criterio de ordenamiento
            if (orderAndPaginate && orderAndPaginate.sort === 'title') {
                products.sort((a, b) => a.title.localeCompare(b.title));
            }

            // Paginar los productos si se proporcionan criterios de paginación
            let totalCount = products.length;
            if (orderAndPaginate && orderAndPaginate.page && orderAndPaginate.limit) {
                const { page, limit } = orderAndPaginate;
                const startIndex = (page - 1) * limit;
                const endIndex = Math.min(startIndex + limit, totalCount);
                products = products.slice(startIndex, endIndex);
            }

            return {
                totalCount,
                products
            };
        } catch (error) {
            throw error;
        }
    }

    async readOne(id) {
        try {
            const products = await this.loadProducts();
            return products.find(product => product.id === id) || null;
        } catch (error) {
            console.error(`Error reading product by ID: ${error.message}`);
            throw error;
        }
    }

    async update(id, data) {
        try {
            const products = await this.loadProducts();
            const productIndex = products.findIndex(product => product.id === id);

            if (productIndex !== -1) {
                products[productIndex] = { ...products[productIndex], ...data };
                await this.saveProducts(products);
                return true;
            }

            return false;
        } catch (error) {
            console.error(`Error updating product: ${error.message}`);
            throw {
                statusCode: 500,
                response: {
                    message: `Error updating product: ${error.message}`,
                },
            };
        }
    }

    async destroy(id) {
        try {
            const products = await this.loadProducts();
            const productIndex = products.findIndex(product => product.id === id);

            if (productIndex !== -1) {
                products.splice(productIndex, 1);
                await this.saveProducts(products);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error(`Error destroying product: ${error.message}`);
            throw {
                statusCode: 500,
                response: {
                    message: `Error destroying product: ${error.message}`,
                },
            };
        }
    }
}

const productsManager = new ProductManager();
export default productsManager;


















