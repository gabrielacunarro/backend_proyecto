import service from "../services/users.services.js";

class SessionController {
    constructor() {
        this.service = service;
    }
    register = async (req, res, next) => {
        const { email, name, verifiedCode } = req.user
        await this.service.register({ email, name, verifiedCode })
        try {
            return res.json({
                statusCode: 201,
                message: "Registered!"
            })
        } catch (error) {
            return next(error)
        }
    };

    login = async (req, res, next) => {
        try {
            return res.cookie("token", req.token, { maxAge: 60 * 60 * 24 * 7, httpOnly: true }).json({
                statusCode: 200,
                message: "Logged in!"
            })
        } catch (error) {
            return next(error)
        }
    };

    signout = async (req, res, next) => {
        try {
            return res.clearCookie("token").json({
                statusCode: 200,
                message: "Signed out!"
            })
        } catch (error) {
            return next(error)
        }
    };

    verifyAccount = async (req, res, next) => {
        try {
            const { email, verificationCode } = req.body;

            if (!email || !verificationCode) {
                return res.status(400).json({ message: 'Email and verification code are required.' });
            }

            const user = await this.service.readByEmail(email);

            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }

            if (user.verifiedCode !== verificationCode) {
                return res.status(400).json({ message: 'Incorrect verification code.' });
            }

            await this.service.update(user._id, { verified: true });

            return res.status(200).json({ message: 'User verified successfully.' });

        } catch (error) {
            return res.status(500).json({ message: 'Internal server error while verifying the account.' });
        }
    };


}
const controller = new SessionController();
const { register, login, signout, verifyAccount } = controller;
export { register, login, signout, verifyAccount };