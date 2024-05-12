import ticketRepository from "../repositories/tickets.repositories.js"

class TicketService {
    constructor() {
        this.repository = ticketRepository;
    }

    create = async (data) => await this.repository.create(data);
    read = async ({ filter }) => await this.repository.read({ filter });
    findOne = async (oid) => await this.repository.findOne(oid);
}

const ticketService = new TicketService();
export default ticketService;
