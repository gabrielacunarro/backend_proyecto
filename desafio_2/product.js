const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

class ProductManager {
    static #productsFile = path.resolve(__dirname, 'data', 'products.json');
    static #products = [];

    constructor() {
        this.loadProducts();
    }

    #verifyRequiredProps(data) {
        const requiredProps = ["title", "photo", "price", "stock"];
        const missingProps = requiredProps.filter(prop => !(prop in data));
        return missingProps;
    }

    #generateProductId() {
        const idGenerator = crypto.createHash('sha256');
        idGenerator.update(`${Date.now()}-${Math.random()}`);
        return idGenerator.digest('hex').slice(0, 8);
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

            try {
                await fs.access(dataFolder);
            } catch (error) {
                // Si la carpeta no existe, la crea
                try {
                    await fs.mkdir(dataFolder);
                } catch (mkdirError) {
                    console.error('Error creating folder:', mkdirError.message);
                }
            }

            await this.saveProducts();
        }
    }

    read() {
        return ProductManager.#products;
    }

    readOne(index) {
        const product = ProductManager.#products[index - 1]; // Restamos 1 porque los índices de arrays comienzan en 0

        if (!product) {
            console.log("Product not found!");
        }

        return product || null;
    }


    async loadProducts() {
        try {
            const data = await fs.readFile(ProductManager.#productsFile, 'utf8');
            if (data.trim() === '') {
                // Inicializo #products como un array vacío
                ProductManager.#products = [];
            } else {
                ProductManager.#products = JSON.parse(data);
            }
        } catch (error) {
            // Manejo error creando un prod vacío
            console.error('Error loading products:', error.message);
            ProductManager.#products = [];
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
}

// Carpeta 'data' para almacenar el archivo JSON
const dataFolder = path.join(__dirname, 'data');

const productManager = new ProductManager();

// Creación de productos
productManager.create({
    title: "N°5 CHANEL",
    photo: "assets/chaneln5.png",
    price: 118000,
    stock: 250
});
productManager.create({
    title: "Blue Seduction",
    photo: "assets/BlueSeduction.png",
    price: 18000,
    stock: 130
});

productManager.create({
    title: "Pure Poison EDP",
    photo: "assets/PurePoison.png",
    price: 18000,
    stock: 180
});

productManager.create({
    title: "Invictus EDT",
    photo: "assets/Invictus.png",
    price: 70000,
    stock: 110
});

console.log("Products:", productManager.read());
console.log("Product with ID 1", productManager.readOne(1));




