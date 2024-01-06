class MemoryOrdersManager {
    static #orders = [];

    create(data, next) {
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
                console.error(`Error creating order: ${error.message}`);
                next(error); // Llamar a next(error) para pasar el error al siguiente middleware
                return {
                    statusCode: 500,
                    response: {
                        message: `Error creating order: ${error.message}`,
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
                    data: MemoryOrdersManager.#orders,
                },
            };
        } catch (error) {
            console.error(`Error reading orders: ${error.message}`);
            next(error);
            return {
                statusCode: 500,
                response: {
                    message: `Error reading orders: ${error.message}`,
                },
            };
        }
    }

    readOne(id, next) {
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
            console.error(`Error reading order: ${error.message}`);
            next(error);
            return {
                statusCode: 500,
                response: {
                    message: `Error reading order: ${error.message}`,
                },
            };
        }
    }

    destroy(id, next) {
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
            console.error(`Error deleting order: ${error.message}`);
            next(error);
            return {
                statusCode: 500,
                response: {
                    message: `Error deleting order: ${error.message}`,
                },
            };
        }
    }

    update(id, data, next) {
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
            console.error(`Error updating order: ${error.message}`);
            next(error);
            return {
                statusCode: 500,
                response: {
                    message: `Error updating order: ${error.message}`,
                },
            };
        }
    }
}

const memoryOrdersManager = new MemoryOrdersManager();


