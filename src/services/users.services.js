import repository from "../repositories/users.repositories.js";
import sendMail from "../utils/sendMail.utils.js";

class UsersService {
    constructor() {
        this.repository = repository
    }
    create = async (data) => await this.repository.create(data);
    read = async ({ filter, orderAndPaginate }) => await this.repository.read({ filter, orderAndPaginate })
    readOne = async (id) => await this.repository.readOne(id)
    readByEmail = async (email) => await this.repository.readByEmail(email)
    update = async (id, data) => await this.repository.update(id, data)
    destroy = async (id) => await this.repository.destroy(id)
    register = async(data) =>{
        try {
            console.log("Data to send mail:", data);
            await sendMail(data)
        } catch (error) {
            throw error
        }
    }
}

const service = new UsersService();
export default service;