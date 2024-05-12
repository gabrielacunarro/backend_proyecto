import TicketDTO from "../dto/ticket.dto.js";
import dao from "../data/index.dao.js";

const { tickets } = dao;

class TicketRepository {
    constructor() {
        this.model = tickets;
    }

    create = async (data) => await this.model.create(new TicketDTO(data));
    read = async ({ filter }) => await this.model.read({ filter });
    findOne = async (oid) => await this.model.findOne({ oid: oid });
}

const ticketRepository = new TicketRepository();
export default ticketRepository;
