import ticketService from "../services/tickets.services.js";

class TicketsController {
    constructor() {
        this.service = ticketService;
    }

    createTicket = async (req, res, next) => {
        try {
            const data  = req.body;
            
            const existingTicket = await this.service.findOne( data.oid );
            if (existingTicket) {
                return res.status(400).json({ message: "There is already a ticket associated with this order" });
            }
    
        const createdTicket = await this.service.create(data);
    
            res.status(201).json(createdTicket);
        } catch (error) {
            next(error);
        }
    };
}

export default TicketsController;
const controller = new TicketsController();
const { createTicket } = controller;
export { createTicket };
