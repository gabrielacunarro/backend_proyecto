import { promises as fs } from 'fs';
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

    async create(data) {
        const missingProps = this.#verifyRequiredProps(data);
    
        if (missingProps.length > 0) {
            console.log(this.#generateWarningMessage(missingProps, data.title));
        } else {
            const id = this.#generateProductId();
    
            const product = {
                id,
                title: data.title,
                photo: data.photo,
                price: data.price,
                stock: data.stock
            };
    
            ProductManager.#products.push(product);
            await this.saveProducts();
        }
    }
    

    read() {
        return ProductManager.#products;
    }

    readOne(id) {
        const product = ProductManager.#products.find(product => product.id === id);

        if (!product) {
            console.log(`Product with ID ${id}: not found!`);
        }

        return product || null;
    }

    async checkAndCreateDataFolder() {
        const dataFolder = path.dirname(ProductManager.#productsFile);
        try {
            await fs.access(dataFolder);
        } catch (error) {
            // Si la carpeta no existe, la crea
            try {
                await fs.mkdir(dataFolder, { recursive: true });
            } catch (mkdirError) {
                console.error('Error creating folder:', mkdirError.message);
            }
        }
    }

    async loadProducts() {
        try {
            const data = await fs.readFile(ProductManager.#productsFile, 'utf8');
            ProductManager.#products = JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT' || error.message === 'Unexpected end of JSON input') {
                // Si el archivo no existe o está vacío, inicializo #products como un array vacío
                ProductManager.#products = [];
            } else {
                // Manejo otros errores al cargar los productos
                console.error('Error loading products:', error.message);
            }
        }
    }
    

    async saveProducts() {
        try {
            const data = JSON.stringify(ProductManager.#products, null, 2);
            await fs.writeFile(ProductManager.#productsFile, data, 'utf8');
        } catch (error) {
            console.error('Error saving products:', error.message);
        }
    }

    destroy(id) {
        const productIndex = ProductManager.#products.findIndex(product => product.id === id);

        if (productIndex !== -1) {
            ProductManager.#products.splice(productIndex, 1);
            console.log(`Product with ID ${id} has been successfully destroyed.`);
            this.saveProducts(); // Guardar los cambios después de eliminar
        } else {
            console.log(`Product with ID ${id} not found. No product has been destroyed.`);
        }
    }
}

const productManager = new ProductManager();

// Creación de productos
productManager.create({
    title: "N°5 CHANEL",
    photo: "assets/chaneln5.png",
    price: 118000,
    stock: 250
});
// productManager.create({
//     title: "Blue Seduction",
//     photo: "assets/BlueSeduction.png",
//     price: 18000,
//     stock: 130
// });

// productManager.create({
//     title: "Pure Poison EDP",
//     photo: "assets/PurePoison.png",
//     price: 18000,
//     stock: 180
// });

// productManager.create({
//     title: "Invictus EDT",
//     photo: "assets/Invictus.png",
//     price: 70000,
//     stock: 110
// });

//console.log("Products:", productManager.read());
//console.log("Product with ID 1", productManager.readOne(1));

export default ProductManager;




















