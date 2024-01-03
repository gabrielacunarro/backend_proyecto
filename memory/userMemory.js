class UserManager {
    #users = [];

    create(data) {
        const requiredProps = ["name", "photo", "email"];

        //  verifico si estan todas las propiedades de cada user, caso contrario arrojo un advertencia/error de creacion del mismo
        const missingProps = requiredProps.filter(prop => !(prop in data) || data[prop] === undefined);

        if (missingProps.length > 0) {
            const missingMessages = missingProps.map(prop => `The user has not been created as the "${prop}" property is missing.`);
            console.log(`Warning: ${missingMessages.join(". ")}`);

        } else {
            const user = {
                id: this.#users.length === 0 ? 1 : this.#users[this.#users.length - 1].id + 1,
                name: data.name,
                photo: data.photo,
                email: data.email
            };
            this.#users.push(user);
        }
    }

    read() {
        return this.#users;
    }
    readOne(id) {
        return this.#users.find(user => user.id === Number(id));
    }

    destroy(id) {
        const index = this.#users.findIndex(user => user.id === Number(id));

        if (index !== -1) {
            this.#users.splice(index, 1);
            console.log(`User with ID ${id} has been deleted.`);
        } else {
            console.log(`User with ID ${id} not found.`);
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