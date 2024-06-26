import service from "../services/users.services.js";
import { createHash, verifyHash } from "../utils/hash.util.js";

class SessionController {
    constructor() {
        this.service = service;
    }
    async register(req, res, next) {
        try {
            const { email, name } = req.body;
            const verificationCode = generateVerificationCode();
            const createdUser = await this.service.register({ email, name, verificationCode });

            await sendMail({ email, name, verificationCode });

            return res.status(201).json({ userId: createdUser._id });
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
    
            const user = await this.service.readByEmail(email);
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }
    
            if (!user.verified) {
                return res.status(403).json({ message: 'User is not verified. Please verify your account.' });
            }
    
            if (verificationCode && verificationCode !== user.verificationCode) {
                return res.status(401).json({ message: 'Incorrect verification code.' });
            }

            const isPasswordValid = verifyHash(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid credentials.' });
            }
    
            const token = createToken({ userId: user._id, email: user.email }); 
    
            return res.cookie("token", token, { maxAge: 60 * 60 * 24 * 7, httpOnly: true, path: '/' }).json({
                statusCode: 200,
                message: "Logged in!"
            });
        } catch (error) {
            next(error);
        }
    }
    
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
    updatePassword = async (req, res, next) => {
        try {
            const { email, password, newPassword } = req.body;

            const user = await this.service.readByEmail(email);
            if (!user) {
                return res.status(404).json({ message: 'User not found.' });
            }

            const isPasswordValid = verifyHash(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Old password is incorrect.' });
            }

            const hashedPassword = createHash(newPassword);

            await this.service.update(user._id, { password: hashedPassword });

            return res.status(200).json({ message: 'Password updated successfully.' });
        } catch (error) {
            return next(error);
        }
    };

}
const controller = new SessionController();
const { register, login, signout, verifyAccount, updatePassword } = controller;
export { register, login, signout, verifyAccount, updatePassword };