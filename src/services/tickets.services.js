import ticketRepository from "../repositories/tickets.repositories.js"; // Asegúrate de importar el repositorio adecuado para los tickets

class TicketService {
    constructor() {
        this.repository = ticketRepository;
    }

    create = async (data) => await this.repository.create(data);
    read = async ({ filter }) => await this.repository.read({ filter });
    readOne = async (id) => await this.repository.readOne(id);
    update = async (id, data) => await this.repository.update(id, data);
    destroy = async (id) => await this.repository.destroy(id);
}

const ticketService = new TicketService();
export default ticketService;
