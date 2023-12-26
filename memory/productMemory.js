class ProductManager {
    static #products = [];

    create(data) {
        const requiredProps = ["title", "photo", "price", "stock"];

        // verifico si estan todas las propiedades de cada producto, caso contrario arrojo un advertencia/error de creacion de art.
        const missingProps = requiredProps.filter(prop => !(prop in data));

        if (missingProps.length > 0) {
            const missingMessages = missingProps.map(prop => `The product has not been created as the "${prop}" property is missing for "${data.title}".`);
            console.log(`Warning: ${missingMessages.join(". ")}`);

        } else {
            const id = ProductManager.#products.length === 0 ? 1 : ProductManager.#products[ProductManager.#products.length - 1].id + 1;

            const product = {
                id,
                title: data.title,
                photo: data.photo,
                price: data.price,
                stock: data.stock
            };

            ProductManager.#products.push(product);
        }
    }

    read() {
        return ProductManager.#products;
    }

    readOne(id) {
        return ProductManager.#products.find(product => product.id === Number(id));
    }
}

const productManager = new ProductManager();
productManager.create({
    title: "N°5 CHANEL",
    photo: "assets/chaneln5.png",
    //price: 118000,
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
