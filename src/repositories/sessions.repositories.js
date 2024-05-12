import SessionDTO from "../dto/";
import dao from "../data/index.dao.js";

const { sessions } = dao;

class SessionsRepository {
    constructor() {
        this.model = sessions;
    }

    create = async (data) => await this.model.create(new SessionDTO(data));
    read = async ({ filter, orderAndPaginate }) => await this.model.read({ filter, orderAndPaginate });
    readOne = async (id) => await this.model.readOne(id);
    readByEmail = async (email) => await this.model.readByEmail(email);
    update = async (id, data) => await this.model.update(id, data);
    destroy = async (id) => await this.model.destroy(id);
}

const repository = new SessionsRepository();
export default repository;
