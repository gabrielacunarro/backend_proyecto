class MemoryOrdersManager {
    static #orders = [];

    create(data) {
        const requiredProps = ["pid", "uid", "quantity", "state"];

        // Verifico si están todas las propiedades de cada orden, caso contrario, lanzo una advertencia/error de creación.
        const missingProps = requiredProps.filter(prop => !(prop in data));

        if (missingProps.length > 0) {
            const missingMessages = missingProps.map(prop => `The order has not been created as the "${prop}" property is missing.`);
            return {
                statusCode: 400,
                response: {
                    message: `Warning: ${missingMessages.join(". ")}`,
                },
            };
        } else {
            try {
                const id = MemoryOrdersManager.#orders.length === 0 ? 1 : MemoryOrdersManager.#orders[MemoryOrdersManager.#orders.length - 1].id + 1;

                const order = {
                    id,
                    pid: data.pid,
                    uid: data.uid,
                    quantity: data.quantity,
                    state: data.state,
                };

                MemoryOrdersManager.#orders.push(order);

                return {
                    statusCode: 201,
                    response: {
                        id,
                        message: "Order has been successfully created.",
                    },
                };
            } catch (error) {
                winston.ERROR(`Error creating order: ${error.message}`);
                throw {
                    statusCode: 500,
                    response: {
                        message: `Error creating order: ${error.message}`,
                    },
                };
            }
        }
    }

    read() {
        try {
            return {
                statusCode: 200,
                response: {
                    data: MemoryOrdersManager.#orders,
                },
            };
        } catch (error) {
            winston.ERROR(`Error reading orders: ${error.message}`);
            throw {
                statusCode: 500,
                response: {
                    message: `Error reading orders: ${error.message}`,
                },
            };
        }
    }

    readOne(id) {
        try {
            const order = MemoryOrdersManager.#orders.find(order => order.id === Number(id));

            if (order) {
                return {
                    statusCode: 200,
                    response: {
                        data: order,
                    },
                };
            } else {
                return {
                    statusCode: 404,
                    response: {
                        message: `Order with ID ${id} not found.`,
                    },
                };
            }
        } catch (error) {
            winston.ERROR(`Error reading order: ${error.message}`);
            throw {
                statusCode: 500,
                response: {
                    message: `Error reading order: ${error.message}`,
                },
            };
        }
    }

    destroy(id) {
        try {
            const index = MemoryOrdersManager.#orders.findIndex(order => order.id === Number(id));

            if (index !== -1) {
                MemoryOrdersManager.#orders.splice(index, 1);
                return {
                    statusCode: 200,
                    response: {
                        message: `Order with ID ${id} has been successfully deleted.`,
                    },
                };
            } else {
                return {
                    statusCode: 404,
                    response: {
                        message: `Order with ID ${id} not found. No order has been deleted.`,
                    },
                };
            }
        } catch (error) {
            winston.ERROR(`Error deleting order: ${error.message}`);
            throw {
                statusCode: 500,
                response: {
                    message: `Error deleting order: ${error.message}`,
                },
            };
        }
    }

    update(id, data) {
        try {
            const index = MemoryOrdersManager.#orders.findIndex(order => order.id === Number(id));

            if (index !== -1) {
                // Actualizar la orden con los nuevos datos
                MemoryOrdersManager.#orders[index] = { ...MemoryOrdersManager.#orders[index], ...data };
                return {
                    statusCode: 200,
                    response: {
                        message: `Order with ID ${id} has been successfully updated.`,
                    },
                };
            } else {
                return {
                    statusCode: 404,
                    response: {
                        message: `Order with ID ${id} not found. No order has been updated.`,
                    },
                };
            }
        } catch (error) {
            winston.ERROR(`Error updating order: ${error.message}`);
            throw {
                statusCode: 500,
                response: {
                    message: `Error updating order: ${error.message}`,
                },
            };
        }
    }
}

const memoryOrdersManager = new MemoryOrdersManager();

export default memoryOrdersManager;

