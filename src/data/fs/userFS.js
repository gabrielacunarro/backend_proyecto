import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

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

    #generateWarningMessage(missingProps) {
        const missingMessages = missingProps.map(prop => `The user has not been created as the "${prop}" property is missing.`);
        return `Warning: ${missingMessages.join(". ")}`;
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
                console.error('Error creating folder:', mkdirError.message);
            }
        }
    }

    async create(data, next) {
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
        } catch (error) {
            console.error(`Error creating user: ${error.message}`);
            next(error);
        }
    }

    read(next) {
        try {
            return UserManager.#users;
        } catch (error) {
            console.error(`Error reading users: ${error.message}`);
            next(error);
            return [];
        }
    }

    readOne(id, next) {
        try {
            const user = UserManager.#users.find(user => user.id === id);

            if (!user) {
                console.log(`User with ID ${id}: not found!`);
            }

            return user || null;
        } catch (error) {
            console.error(`Error reading user: ${error.message}`);
            next(error);
            return null;
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
                console.log('Users file not found. Creating a new one.');
                await this.saveUsers();
            } else {
                console.error('Error loading users:', error.message);
            }
        }
    }

    async saveUsers() {
        try {
            if (UserManager.#users.length === 0) {
                console.log('No users found. Creating an empty users array.');
                UserManager.#users = [];
            }

            const data = JSON.stringify(UserManager.#users, null, 2);
            await fs.writeFile(UserManager.#usersFile, data, 'utf8');
            console.log('Users saved successfully.');
        } catch (error) {
            console.error('Error saving users:', error.message);
        }
    }

    destroy(id, next) {
        try {
            const userIndex = UserManager.#users.findIndex(user => user.id === id);

            if (userIndex !== -1) {
                UserManager.#users.splice(userIndex, 1);
                this.saveUsers().then(() => {
                    console.log(`User with ID ${id} has been successfully destroyed.`);
                }).catch(error => {
                    console.error(`Error saving users after destroying user: ${error.message}`);
                });
                return true;
            } else {
                console.log(`User with ID ${id} not found. No user has been destroyed.`);
                return false;
            }
        } catch (error) {
            console.error(`Error destroying user: ${error.message}`);
            next(error);
            return false;
        }
    }

    update(id, data, next) {
        try {
            if (!UserManager.#users || UserManager.#users.length === 0) {
                return false;
            }

            const userIndex = UserManager.#users.findIndex(user => user.id === id);

            if (userIndex !== -1) {

                UserManager.#users[userIndex] = { ...UserManager.#users[userIndex], ...data };
                this.saveUsers().then(() => {
                    console.log(`User with ID ${id} has been successfully updated.`);
                }).catch(error => {
                    console.error(`Error saving users after updating user: ${error.message}`);
                });
                return true;
            }

            return false;
        } catch (error) {
            console.error(`Error updating user: ${error.message}`);
            next(error);
            return false;
        }
    }
}

const usersManager = new UserManager();

export default usersManager;








