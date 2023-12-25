const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

class UserManager {
    static #usersFile = path.resolve(__dirname, 'data', 'users.json');
    static #users = [];

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
                await fs.access(dataFolder);
            } catch (error) {
                // Si la carpeta no existe, la crea
                try {
                    await fs.mkdir(dataFolder);
                } catch (mkdirError) {
                    console.error('Error creating folder:', mkdirError.message);
                }
            }

            // Llama a saveUsers después de cargar los usuarios
            await this.loadUsers();
            await this.saveUsers();
        }
    }

    read() {
        return UserManager.#users;
    }

    readOne(index) {
        const userIndex = index !== undefined ? index - 1 : 0;
        const user = UserManager.#users[userIndex];
    
        if (!user) {
            console.log(`User at position ${index || 1}: not found!`);
        }
    
        return user || null;
    } 

    async loadUsers() {
        try {
            const data = await fs.readFile(UserManager.#usersFile, 'utf8');
            if (data.trim() === '') {
                // Inicializo #users como un array vacío
                UserManager.#users = [];
            } else {
                UserManager.#users = JSON.parse(data);
            }
        } catch (error) {
            // Manejo de error creando un user vacío
            console.error('Error loading users:', error.message);
            UserManager.#users = [];
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
}

// Creo la carpeta 'data' para almacenar el archivo JSON
const dataFolder = path.join(__dirname, 'data');

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

console.log("Users:", userManager.read());
console.log("User with ID 1:", userManager.readOne(1));



