import CustomRouter from "../CustomRouter.js";

export default class ComplexRouter extends CustomRouter {
    init() {
        this.get("/", (req, res) => {
            try {
                let total = BigInt(1);
                for (let i = BigInt(1); i <= BigInt(100000); i++) {
                    total *= i; 
                }
                return res.send({ total: total.toString() });
            } catch (error) {
                return res.status(500).send({ message: "Error calculating the total" });
            }
        });
    }
}

