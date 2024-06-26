import crypto from 'crypto';

class ProductManager {
    static #products = [];

    create(data) {
        const requiredProps = ["title", "photo", "price", "stock"];

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
                const id = crypto.randomBytes(8).toString('hex');

                const product = {
                    id,
                    title: data.title,
                    photo: data.photo,
                    price: data.price,
                    stock: data.stock,
                };

                ProductManager.#products.push(product);

                return id;
            } catch (error) {
                winston.ERROR(`Error creating product: ${error.message}`);
                throw {
                    statusCode: 500,
                    response: {
                        message: `Error creating product: ${error.message}`,
                    },
                };
            }
        }
    }

    read(obj) {
        try {
            let { filter, orderAndPaginate } = obj || {};
            let products = ProductManager.#products;

            if (filter && filter.title) {
                products = products.filter(product => product.title.includes(filter.title));
            }

            if (orderAndPaginate && orderAndPaginate.sort === 'title') {
                products.sort((a, b) => a.title.localeCompare(b.title));
            }

            if (orderAndPaginate && orderAndPaginate.page && orderAndPaginate.limit) {
                const { page, limit } = orderAndPaginate;
                const startIndex = (page - 1) * limit;
                const endIndex = page * limit;
                products = products.slice(startIndex, endIndex);
            }
            return products
        } catch (error) {
            throw error;
        }
    }


    readOne(id) {
        try {
            const product = ProductManager.#products.find(product => product.id === id);

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
            winston.ERROR(`Error reading product: ${error.message}`);
            throw {
                statusCode: 500,
                response: {
                    message: `Error reading product: ${error.message}`,
                },
            };
        }
    }

    destroy(id) {
        try {
            const index = ProductManager.#products.findIndex(product => product.id === id);

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
            winston.ERROR(`Error deleting product: ${error.message}`);
            throw {
                statusCode: 500,
                response: {
                    message: `Error deleting product: ${error.message}`,
                },
            };
        }
    }

    update(id, data) {
        try {
            const index = ProductManager.#products.findIndex(product => product.id === id);

            if (index !== -1) {

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
            winston.ERROR(`Error updating product: ${error.message}`);
            throw {
                statusCode: 500,
                response: {
                    message: `Error updating product: ${error.message}`,
                },
            };
        }
    }
}

const productManager = new ProductManager();
export default productManager;
