class UserManager {
    #users = [];

    create(data) {
        const requiredProps = ["name", "photo", "email"];

        //  verifico si estan todas las propiedades de cada user, caso contrario arrojo un advertencia/error de creacion del mismo
        const missingProps = requiredProps.filter(prop => !(prop in data) || data[prop] === undefined);

        if (missingProps.length > 0) {
            const missingMessages = missingProps.map(prop => `The user has not been created as the "${prop}" property is missing.`);
            return {
                statusCode: 400,
                response: {
                    message: `Warning: ${missingMessages.join(". ")}`,
                },
            };
        } else {
            const user = {
                id: this.#users.length === 0 ? 1 : this.#users[this.#users.length - 1].id + 1,
                name: data.name,
                photo: data.photo,
                email: data.email,
            };
            this.#users.push(user);

            return {
                statusCode: 201,
                response: {
                    id: user.id,
                    message: "User has been successfully created.",
                },
            };
        }
    }

    read() {
        return {
            statusCode: 200,
            response: {
                data: this.#users,
            },
        };
    }

    readOne(id) {
        const user = this.#users.find(user => user.id === Number(id));

        if (user) {
            return {
                statusCode: 200,
                response: {
                    data: user,
                },
            };
        } else {
            return {
                statusCode: 404,
                response: {
                    message: `User with ID ${id} not found.`,
                },
            };
        }
    }

    destroy(id) {
        const index = this.#users.findIndex(user => user.id === Number(id));

        if (index !== -1) {
            this.#users.splice(index, 1);
            return {
                statusCode: 200,
                response: {
                    message: `User with ID ${id} has been successfully deleted.`,
                },
            };
        } else {
            return {
                statusCode: 404,
                response: {
                    message: `User with ID ${id} not found. No user has been deleted.`,
                },
            };
        }
    }

    update(id, data) {
        const index = this.#users.findIndex(user => user.id === Number(id));

        if (index !== -1) {
            this.#users[index] = { ...this.#users[index], ...data };
            return {
                statusCode: 200,
                response: {
                    message: `User with ID ${id} has been successfully updated.`,
                },
            };
        } else {
            return {
                statusCode: 404,
                response: {
                    message: `User with ID ${id} not found. No user has been updated.`,
                },
            };
        }
    }
}

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
console.log("User with id 2:", userManager.readOne(2));
userManager.destroy(1);  // Eliminará el usuario con ID 1