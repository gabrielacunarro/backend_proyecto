import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const usersFilePath = path.join('data', 'fs', 'files', 'users.json');
const dataFolder = path.join(process.cwd(), 'data', 'fs');

class UserManager {
    static #usersFile = path.resolve(usersFilePath);
    static #users = [];

    constructor() {
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

            try {
                // Verificar la existencia de la carpeta que contiene users.json
                await fs.access(dataFolder);
            } catch (error) {
                // Si la carpeta no existe, la crea
                if (error.code === 'ENOENT') {
                    try {
                        await fs.mkdir(dataFolder, { recursive: true });
                    } catch (mkdirError) {
                        console.error('Error creating folder:', mkdirError.message);
                    }
                } else {
                    console.error('Error accessing folder:', error.message);
                }
            }

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

    async loadUsers() {
        try {
            // Verificar la existencia del archivo users.json
            await fs.access(UserManager.#usersFile);
            const data = await fs.readFile(UserManager.#usersFile, 'utf8');

            if (data.trim() === '') {
                UserManager.#users = [];
            } else {
                UserManager.#users = JSON.parse(data);
            }
        } catch (error) {
            // Manejo de error creando un usuario vacío
            if (error.code === 'ENOENT') {
                // Si el archivo no existe, inicializar #users como un array vacío
                UserManager.#users = [];
            } else {
                console.error('Error loading users:', error.message);
                UserManager.#users = [];
            }
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
            console.log(`User with ID ${id} has been successfully destroyed.`);
            this.saveUsers(); // Guardar los cambios después de eliminar
        } else {
            console.log(`User with ID ${id} not found. No user has been destroyed.`);
        }
    }
}

// Creación de usuarios
const userManager = new UserManager();

userManager.create({
    name: "Alejandro Perez",
    photo: "Alejandro.jpg",
    email: "alejandro.perez@gmail.com"
});

userManager.create({
    name: "Federico Suarez",
    photo: "Federico.jpg",
    email: "federico_suarez@gmail.com"
});

userManager.create({
    name: "Ana De Luca",
    photo: "Ana.jpg",
    email: "ana_deluca@gmail.com"
});

userManager.create({
    name: "Maria Sosa",
    photo: "Maria.jpg",
    email: "maria-sosa@gmail.com"
});

//console.log("Users:", userManager.read());
//sconsole.log("User with ID 1:", userManager.readOne(userManager.read()[0].id));

export default UserManager;






