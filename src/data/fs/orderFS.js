import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

class OrdersManager {
    static #ordersFile = 'src/data/fs/files/orders.json';
    static #orders = [];

    constructor() {
        this.checkAndCreateDataFolder();
        this.loadOrders();
    }

    #verifyRequiredProps(data) {
        const requiredProps = ["pid", "uid", "quantity", "state"];
        const missingProps = requiredProps.filter(prop => !(prop in data));
        return missingProps;
    }

    #generateOrderId() {
        const idGenerator = crypto.randomBytes(4).toString('hex');
        return idGenerator;
    }

    #generateWarningMessage(missingProps) {
        const missingMessages = missingProps.map(prop => `The order has not been created as the "${prop}" property is missing.`);
        return `Warning: ${missingMessages.join(". ")}`;
    }

    // Método para constatar si la datafolder existe o no
    async checkAndCreateDataFolder() {
        const dataFolder = path.dirname(OrdersManager.#ordersFile);

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

    // Método de creación de órdenes
    async createOrder(data, next) {
        try {
            const missingProps = this.#verifyRequiredProps(data);

            if (missingProps.length > 0) {
                const errorMessage = this.#generateWarningMessage(missingProps);
                return {
                    statusCode: 400,
                    response: {
                        message: errorMessage,
                    },
                };
            }

            const id = this.#generateOrderId();

            const order = {
                id,
                pid: data.pid,
                uid: data.uid,
                quantity: data.quantity,
                state: data.state,
            };

            OrdersManager.#orders.push(order);

            // Guardar las órdenes y obtener la lista actualizada después de la operación
            await this.saveOrders();

            return {
                statusCode: 201,
                response: {
                    id: id,
                    message: "Order has been successfully created.",
                },
            };
        } catch (error) {
            console.error(`Error creating order: ${error.message}`);
            next(error);
            return {
                statusCode: 500,
                response: {
                    message: `Error creating order: ${error.message}`,
                },
            };
        }
    }

    // Método para la carga de órdenes
    async loadOrders(next) {
        try {
            const data = await fs.promises.readFile(OrdersManager.#ordersFile, 'utf8');
            OrdersManager.#orders = JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT' || error.message === 'Unexpected end of JSON input') {
                // Si el archivo no existe o está vacío, inicializo #orders como un array vacío
                OrdersManager.#orders = [];
            } else {
                console.error('Error loading orders:', error.message);
                next(error);
            }
        }
    }

    // Método para el guardado de órdenes
    async saveOrders(next) {
        try {
            const data = JSON.stringify(OrdersManager.#orders, null, 2);
            await fs.promises.writeFile(OrdersManager.#ordersFile, data, { encoding: 'utf8' });
            return OrdersManager.#orders; // Devolver la lista actualizada después de guardarlas
        } catch (error) {
            console.error('Error saving orders:', error.message);
            next(error);
        }
    }

    // Método para leer las órdenes
    async readOrders(next) {
        try {
            const data = await fs.promises.readFile(OrdersManager.#ordersFile, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                // Manejar el caso cuando el archivo no existe
                console.log('Orders file not found. Returning an empty array.');
                return [];
            } else {
                // Re-lanzar el error si es de otro tipo
                console.error(`Error reading orders: ${error.message}`);
                next(error);
                return [];
            }
        }
    }

    // Método para leer las órdenes de un usuario
    readByUser(uid) {
        return OrdersManager.#orders.filter(order => order.uid === uid);
    }

    // Método de actualización de órdenes
    async updateOrder(oid, quantity, state, next) {
        try {
            const orderIndex = OrdersManager.#orders.findIndex(order => order.id === oid);

            if (orderIndex !== -1) {
                OrdersManager.#orders[orderIndex].quantity = quantity;
                OrdersManager.#orders[orderIndex].state = state;
                await this.saveOrders();
                console.log(`Order with ID ${oid} has been successfully updated in file system.`);
                return {
                    statusCode: 200,
                    response: {
                        message: `Order with ID ${oid} has been successfully updated in file system.`,
                    },
                };
            } else {
                console.log(`Order with ID ${oid} not found in file system. No order has been updated.`);
                return {
                    statusCode: 404,
                    response: {
                        message: `Order with ID ${oid} not found in file system. No order has been updated.`,
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

    // Método para eliminar una orden
    async destroyOrder(oid, next) {
        try {
            const orderIndex = OrdersManager.#orders.findIndex(order => order.id === oid);

            if (orderIndex !== -1) {
                OrdersManager.#orders.splice(orderIndex, 1);
                await this.saveOrders();
                console.log(`Order with ID ${oid} has been successfully deleted from file system.`);
                return {
                    statusCode: 200,
                    response: {
                        message: `Order with ID ${oid} has been successfully deleted from file system.`,
                    },
                };
            } else {
                console.log(`Order with ID ${oid} not found in file system. No order has been deleted.`);
                return {
                    statusCode: 404,
                    response: {
                        message: `Order with ID ${oid} not found in file system. No order has been deleted.`,
                    },
                };
            }
        } catch (error) {
            console.error(`Error destroying order: ${error.message}`);
            next(error);
            return {
                statusCode: 500,
                response: {
                    message: `Error destroying order: ${error.message}`,
                },
            };
        }
    }
}

const ordersManager = new OrdersManager();
export default ordersManager;

