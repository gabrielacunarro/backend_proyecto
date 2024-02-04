import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

class OrdersManager {
    static #ordersFile = 'src/data/fs/files/orders.json';

    constructor() {
        this.checkAndCreateDataFolder();
    }

    #generateOrderId() {
        return crypto.randomBytes(4).toString('hex');
    }

    async checkAndCreateDataFolder() {
        const dataFolder = path.dirname(OrdersManager.#ordersFile);

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

    async createOrder(data) {
        try {
            const id = this.#generateOrderId();
            const order = {
                id,
                pid: data.pid,
                uid: data.uid,
                quantity: data.quantity,
                state: data.state,
            };

            const orders = await this.loadOrders();
            orders.push(order);

            await this.saveOrders(orders);

            return {
                statusCode: 201,
                response: {
                    id: id,
                    message: "Order has been successfully created.",
                },
            };
        } catch (error) {
            console.error(`Error creating order: ${error.message}`);
            throw {
                statusCode: 500,
                response: {
                    message: `Error creating order: ${error.message}`,
                },
            };
        }
    }

    async loadOrders() {
        try {
            const data = await fs.readFile(OrdersManager.#ordersFile, 'utf8');
            return JSON.parse(data) || [];
        } catch (error) {
            if (error.code === 'ENOENT' || error.message === 'Unexpected end of JSON input') {
                return [];
            } else {
                console.error('Error loading orders:', error.message);
                throw error;
            }
        }
    }

    async saveOrders(orders) {
        try {
            const data = JSON.stringify(orders, null, 2);
            await fs.writeFile(OrdersManager.#ordersFile, data, { encoding: 'utf8' });
        } catch (error) {
            console.error('Error saving orders:', error.message);
            throw error;
        }
    }

    async readOrders() {
        try {
            return await this.loadOrders();
        } catch (error) {
            console.error(`Error reading orders: ${error.message}`);
            throw error;
        }
    }

    async readOrderById(oid) {
        try {
            const orders = await this.loadOrders();
            return orders.find(order => order.id === oid) || null;
        } catch (error) {
            console.error(`Error reading order by ID: ${error.message}`);
            throw error;
        }
    }

    async updateOrder(oid, quantity, state) {
        try {
            const orders = await this.loadOrders();
            const orderIndex = orders.findIndex(order => order.id === oid);

            if (orderIndex !== -1) {
                orders[orderIndex].quantity = quantity;
                orders[orderIndex].state = state;
                await this.saveOrders(orders);
                return {
                    statusCode: 200,
                    response: {
                        message: `Order with ID ${oid} has been successfully updated in file system.`,
                    },
                };
            } else {
                return {
                    statusCode: 404,
                    response: {
                        message: `Order with ID ${oid} not found in file system. No order has been updated.`,
                    },
                };
            }
        } catch (error) {
            console.error(`Error updating order: ${error.message}`);
            throw {
                statusCode: 500,
                response: {
                    message: `Error updating order: ${error.message}`,
                },
            };
        }
    }

    async destroyOrder(oid) {
        try {
            const orders = await this.loadOrders();
            const orderIndex = orders.findIndex(order => order.id === oid);

            if (orderIndex !== -1) {
                orders.splice(orderIndex, 1);
                await this.saveOrders(orders);
                return {
                    statusCode: 200,
                    response: {
                        message: `Order with ID ${oid} has been successfully deleted from file system.`,
                    },
                };
            } else {
                return {
                    statusCode: 404,
                    response: {
                        message: `Order with ID ${oid} not found in file system. No order has been deleted.`,
                    },
                };
            }
        } catch (error) {
            console.error(`Error destroying order: ${error.message}`);
            throw {
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

