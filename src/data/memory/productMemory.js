class ProductManager {
    static #products = [];

    create(data, next) {
        const requiredProps = ["title", "photo", "price", "stock"];

        // Verifico si están todas las propiedades de cada producto, caso contrario, lanzo una advertencia/error de creación.
        const missingProps = requiredProps.filter(prop => !(prop in data));

        if (missingProps.length > 0) {
            const missingMessages = missingProps.map(prop => `The product has not been created as the "${prop}" property is missing for "${data.title}".`);
            return {
                statusCode: 400,
                response: {
                    message: `Warning: ${missingMessages.join(". ")}`,
                },
            };
        } else {
            try {
                const id = ProductManager.#products.length === 0 ? 1 : ProductManager.#products[ProductManager.#products.length - 1].id + 1;

                const product = {
                    id,
                    title: data.title,
                    photo: data.photo,
                    price: data.price,
                    stock: data.stock,
                };

                ProductManager.#products.push(product);

                return {
                    statusCode: 201,
                    response: {
                        id: id,
                        message: "Product has been successfully created.",
                    },
                };
            } catch (error) {
                console.error(`Error creating product: ${error.message}`);
                next(error); // Llamar a next(error) para pasar el error al siguiente middleware
                return {
                    statusCode: 500,
                    response: {
                        message: `Error creating product: ${error.message}`,
                    },
                };
            }
        }
    }

    read(next) {
        try {
            return {
                statusCode: 200,
                response: {
                    data: ProductManager.#products,
                },
            };
        } catch (error) {
            console.error(`Error reading products: ${error.message}`);
            next(error);
            return {
                statusCode: 500,
                response: {
                    message: `Error reading products: ${error.message}`,
                },
            };
        }
    }

    readOne(id, next) {
        try {
            const product = ProductManager.#products.find(product => product.id === Number(id));

            if (product) {
                return {
                    statusCode: 200,
                    response: {
                        data: product,
                    },
                };
            } else {
                return {
                    statusCode: 404,
                    response: {
                        message: `Product with ID ${id} not found.`,
                    },
                };
            }
        } catch (error) {
            console.error(`Error reading product: ${error.message}`);
            next(error);
            return {
                statusCode: 500,
                response: {
                    message: `Error reading product: ${error.message}`,
                },
            };
        }
    }

    destroy(id, next) {
        try {
            const index = ProductManager.#products.findIndex(product => product.id === Number(id));

            if (index !== -1) {
                ProductManager.#products.splice(index, 1);
                return {
                    statusCode: 200,
                    response: {
                        message: `Product with ID ${id} has been successfully deleted.`,
                    },
                };
            } else {
                return {
                    statusCode: 404,
                    response: {
                        message: `Product with ID ${id} not found. No product has been deleted.`,
                    },
                };
            }
        } catch (error) {
            console.error(`Error deleting product: ${error.message}`);
            next(error);
            return {
                statusCode: 500,
                response: {
                    message: `Error deleting product: ${error.message}`,
                },
            };
        }
    }

    update(id, data, next) {
        try {
            const index = ProductManager.#products.findIndex(product => product.id === Number(id));

            if (index !== -1) {
                // Actualizar el producto con los nuevos datos
                ProductManager.#products[index] = { ...ProductManager.#products[index], ...data };
                return {
                    statusCode: 200,
                    response: {
                        message: `Product with ID ${id} has been successfully updated.`,
                    },
                };
            } else {
                return {
                    statusCode: 404,
                    response: {
                        message: `Product with ID ${id} not found. No product has been updated.`,
                    },
                };
            }
        } catch (error) {
            console.error(`Error updating product: ${error.message}`);
            next(error);
            return {
                statusCode: 500,
                response: {
                    message: `Error updating product: ${error.message}`,
                },
            };
        }
    }
}

const productManager = new ProductManager();

export default productManager
