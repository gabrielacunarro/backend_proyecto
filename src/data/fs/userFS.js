import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import winston from '../../utils/logger/winston.utils.js';

const usersFilePath = path.join('src', 'data', 'fs', 'files', 'users.json');
const dataFolder = path.join(process.cwd(), 'src', 'data', 'fs');

class UserManager {
    static #usersFile = path.resolve(usersFilePath);
    static #users = [];

    constructor() {
        this.checkAndCreateDataFolder();
        this.loadUsers();
    }

    #verifyRequiredProps(data) {
        const requiredProps = ["name", "photo", "email"];
        const missingProps = requiredProps.filter(prop => !(prop in data) || data[prop] === undefined);
        return missingProps;
    }

    #generateUserId() {
        const idGenerator = crypto.createHash('sha256');
        idGenerator.update(`${Date.now()}-${Math.random()}`);
        return idGenerator.digest('hex').slice(0, 8);
    }

    async checkAndCreateDataFolder() {
        try {
            // Intenta acceder a la carpeta
            await fs.access(dataFolder);
        } catch (error) {
            // Si la carpeta no existe, la crea
            try {
                await fs.mkdir(dataFolder, { recursive: true });
            } catch (mkdirError) {
                winston.error('Error creating folder:', mkdirError.message);
            }
        }
    }

    async create(data) {
        try {
            const id = this.#generateUserId();

            const user = {
                id,
                name: data.name,
                photo: data.photo,
                email: data.email
            };

            UserManager.#users.push(user);

            await this.saveUsers();

            return id; // Devuelve el ID del usuario creado
        } catch (error) {
            winston.error(`Error creating user: ${error.message}`);
            throw error;
        }
    }

    read(obj) {
        try {
            const { filter } = obj || {};
            // Aplica el filtro y devuelve la lista de usuarios
            return UserManager.#users.filter(user => {
                // Implementa tu lógica de filtrado aquí
                // por ahora, devuelve todos los usuarios sin filtrar
                return true;
            });
        } catch (error) {
            winston.error(`Error reading users: ${error.message}`);
            throw {
                statusCode: 500,
                response: {
                    message: `Error reading users: ${error.message}`,
                },
            };
        }
    }

    readOne(id) {
        try {
            return UserManager.#users.find(user => user.id === id) || null;
        } catch (error) {
            winston.error(`Error reading user: ${error.message}`);
            throw {
                statusCode: 500,
                response: {
                    message: `Error reading user: ${error.message}`,
                },
            };
        }
    }

    async loadUsers() {
        try {
            await this.checkAndCreateDataFolder();
            await fs.access(UserManager.#usersFile);

            const data = await fs.readFile(UserManager.#usersFile, 'utf8');
            UserManager.#users = JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                await this.saveUsers();
            } else {
                winston.ERROR('Error loading users:', error.message);
                throw error;
            }
        }
    }

    async saveUsers() {
        try {
            if (UserManager.#users.length === 0) {
                UserManager.#users = [];
            }

            const data = JSON.stringify(UserManager.#users, null, 2);
            await fs.writeFile(UserManager.#usersFile, data, 'utf8');
            winston.INFO('Users saved successfully.');
        } catch (error) {
            winston.ERROR('Error saving users:', error.message);
            throw error;
        }
    }

    destroy(id) {
        try {
            const userIndex = UserManager.#users.findIndex(user => user.id === id);

            if (userIndex !== -1) {
                UserManager.#users.splice(userIndex, 1);
                this.saveUsers().then(() => {
                    winston.INFO(`User with ID ${id} has been successfully destroyed.`);
                }).catch(error => {
                    winston.error(`Error saving users after destroying user: ${error.message}`);
                });
                return true;
            } else {
                winston.ERROR(`User with ID ${id} not found. No user has been destroyed.`);
                return false;
            }
        } catch (error) {
            winston.error(`Error destroying user: ${error.message}`);
            throw {
                statusCode: 500,
                response: {
                    message: `Error destroying user: ${error.message}`,
                },
            };
        }
    }

    update(id, data) {
        try {
            const userIndex = UserManager.#users.findIndex(user => user.id === id);

            if (userIndex !== -1) {
                UserManager.#users[userIndex] = { ...UserManager.#users[userIndex], ...data };
                this.saveUsers().then(() => {
                    winston.INFO(`User with ID ${id} has been successfully updated.`);
                }).catch(error => {
                    winston.ERROR(`Error saving users after updating user: ${error.message}`);
                });
                return UserManager.#users[userIndex]; // Devuelve los datos del usuario actualizados
            }

            return null;
        } catch (error) {
            winston.error(`Error updating user: ${error.message}`);
            throw {
                statusCode: 500,
                response: {
                    message: `Error updating user: ${error.message}`,
                },
            };
        }
    }

    readByEmail(email) {
        try {
            const lowercasedEmail = email.toLowerCase();
            return UserManager.#users.find(user => user.email.toLowerCase() === lowercasedEmail) || null;
        } catch (error) {
            winston.error(`Error reading user by email: ${error.message}`);
            return null;
        }
    }

}

const usersManager = new UserManager();
export default usersManager;










