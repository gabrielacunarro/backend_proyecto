import CustomRouter from "../CustomRouter.js";

export default class SimplexRouter extends CustomRouter {
    init() {
        this.get("/", (req, res) => {
            try {
                let total = 1;
                for (let i = 1; i < 100; i++) {
                    total *= i; 
                }
                return res.send({ total });
            } catch (error) {
                return res.status(500).send({ message: "Error calculating the total" });
            }
        });
    }
}
