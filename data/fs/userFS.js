import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const usersFilePath = path.join('data', 'fs', 'files', 'users.json');
const dataFolder = path.join(process.cwd(), 'data', 'fs');

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

    // Método para constatar si la datafolder existe o no
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

    async create(data) {
        const missingProps = this.#verifyRequiredProps(data);

        if (missingProps.length > 0) {
            console.log(this.#generateWarningMessage(missingProps));
        } else {
            const id = this.#generateUserId();

            const user = {
                id,
                name: data.name,
                photo: data.photo,
                email: data.email
            };

            UserManager.#users.push(user);

            await this.saveUsers();
        }
    }

    read() {
        return UserManager.#users;
    }

    readOne(id) {
        const user = UserManager.#users.find(user => user.id === id);

        if (!user) {
            console.log(`User with ID ${id}: not found!`);
        }

        return user || null;
    }

    // En UserManager
    async loadUsers() {
        try {
            await fs.access(UserManager.#usersFile);
            const data = await fs.readFile(UserManager.#usersFile, 'utf8');

            UserManager.#users = JSON.parse(data);
        } catch (error) {
            console.error('Error loading users:', error.message);
        }
    }


    async saveUsers() {
        try {
            const data = JSON.stringify(UserManager.#users, null, 2);
            await fs.writeFile(UserManager.#usersFile, data, 'utf8');
        } catch (error) {
            console.error('Error saving users:', error.message);
        }
    }

    destroy(id) {
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
    }
}

export default UserManager;







