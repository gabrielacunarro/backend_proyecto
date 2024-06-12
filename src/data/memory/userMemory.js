class UserManager {
    #users = [];

    create(data, next) {
        const requiredProps = ["name", "photo", "email"];

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
            try {
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
            } catch (error) {
                winston.ERROR(`Error creating user: ${error.message}`);
                next(error);
                return {
                    statusCode: 500,
                    response: {
                        message: `Error creating user: ${error.message}`,
                    },
                };
            }
        }
    }

    read(next) {
        try {
            return {
                statusCode: 200,
                response: {
                    data: this.#users,
                },
            };
        } catch (error) {
            winston.ERROR(`Error reading users: ${error.message}`);
            next(error);
            return {
                statusCode: 500,
                response: {
                    message: `Error reading users: ${error.message}`,
                },
            };
        }
    }

    readOne(id, next) {
        try {
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
        } catch (error) {
            winston.ERROR(`Error reading user: ${error.message}`);
            next(error);
            return {
                statusCode: 500,
                response: {
                    message: `Error reading user: ${error.message}`,
                },
            };
        }
    }

    destroy(id, next) {
        try {
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
        } catch (error) {
            winston.ERROR(`Error deleting user: ${error.message}`);
            next(error);
            return {
                statusCode: 500,
                response: {
                    message: `Error deleting user: ${error.message}`,
                },
            };
        }
    }

    update(id, data, next) {
        try {
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
        } catch (error) {
            winston.ERROR(`Error updating user: ${error.message}`);
            next(error);
            return {
                statusCode: 500,
                response: {
                    message: `Error updating user: ${error.message}`,
                },
            };
        }
    }

    readByEmail(email, next) {
        try {
            const user = this.#users.find(user => user.email === email);

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
                        message: `User with email ${email} not found.`,
                    },
                };
            }
        } catch (error) {
            winston.ERROR(`Error reading user by email: ${error.message}`);
            next(error);
            return {
                statusCode: 500,
                response: {
                    message: `Error reading user by email: ${error.message}`,
                },
            };
        }
    }

}

const userManager = new UserManager();
export default userManager;

