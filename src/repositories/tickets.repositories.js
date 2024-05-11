import TicketDTO from "../dto/ticket.dto.js";
import dao from "../data/index.dao.js";

const { tickets } = dao;

class TicketRepository {
    constructor() {
        this.model = tickets;
    }

    create = async (data) => await this.model.create(new TicketDTO(data));
    read = async ({ filter }) => await this.model.read({ filter });
    readOne = async (id) => await this.model.readOne(id);
    update = async (id, data) => await this.model.update(id, data);
    destroy = async (id) => await this.model.destroy(id);
}

const ticketRepository = new TicketRepository();
export default ticketRepository;
