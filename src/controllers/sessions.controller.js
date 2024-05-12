import service from "../services/users.services.js";
import { createHash, verifyHash } from "../utils/hash.util.js";

class SessionController {
    constructor() {
        this.service = service;
    }
    register = async (req, res, next) => {
        try {
            const { email, name, verifiedCode } = req.user;
            const createdUser = await this.service.register({ email, name, verifiedCode });

            const uid = createdUser._id;

            return res.status(201).json({ userId: uid });
        } catch (error) {
            next(error);
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
// Endpoint para actualizar la contraseña
updatePassword = async (req, res, next) => {
    try {
        const { email, password, newPassword } = req.body; // Extraer el correo electrónico, la contraseña antigua y la nueva contraseña del cuerpo de la solicitud
        console.log(newPassword)
        // Buscar al usuario por su correo electrónico
        const user = await this.service.readByEmail(email);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Verificar que la contraseña antigua proporcionada coincida con la contraseña almacenada en la base de datos
        const isPasswordValid = verifyHash(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Old password is incorrect.' });
        }

        // Generar el hash de la nueva contraseña
        const hashedPassword = createHash(newPassword);

        // Actualizar la contraseña del usuario en la base de datos
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