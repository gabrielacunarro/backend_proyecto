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

    async create(data) {
        try {
            const id = this.#generateOrderId();
            const order = {
                id,
                pid: data.pid,
                uid: data.uid,
                quantity: data.quantity,
                state: data.state,
            };

            const orders = await this.load();
            orders.push(order);

            await this.save(orders);

            return id;
        } catch (error) {
            throw error;
        }
    }


    async read() {
        try {
            return {
                statusCode: 200,
                response: {
                    data: await this.load(),
                },
            };
        } catch (error) {
            console.error(`Error reading orders: ${error.message}`);
            throw {
                statusCode: 500,
                response: {
                    message: `Error reading orders: ${error.message}`,
                },
            };
        }
    }

    async readOne(id) {
        try {
            const orders = await this.load();
            const order = orders.find(order => order.id === id);

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
            throw {
                statusCode: 500,
                response: {
                    message: `Error reading order: ${error.message}`,
                },
            };
        }
    }

    async destroy(id) {
        try {
            const orders = await this.load();
            const filteredOrders = orders.filter(order => order.id !== id);

            if (orders.length !== filteredOrders.length) {
                await this.save(filteredOrders);
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
            throw {
                statusCode: 500,
                response: {
                    message: `Error deleting order: ${error.message}`,
                },
            };
        }
    }

    async update(id, newData) {
        try {
            const orders = await this.load();
            const orderIndex = orders.findIndex(order => order.id === id);

            if (orderIndex !== -1) {
                orders[orderIndex] = { ...orders[orderIndex], ...newData };
                await this.save(orders);
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
            throw {
                statusCode: 500,
                response: {
                    message: `Error updating order: ${error.message}`,
                },
            };
        }
    }

    async load() {
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

    async save(orders) {
        try {
            const data = JSON.stringify(orders, null, 2);
            await fs.writeFile(OrdersManager.#ordersFile, data, { encoding: 'utf8' });
        } catch (error) {
            console.error('Error saving orders:', error.message);
            throw error;
        }
    }
}

const ordersManager = new OrdersManager();
export default ordersManager;


