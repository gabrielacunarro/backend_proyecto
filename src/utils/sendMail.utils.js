import { createTransport } from "nodemailer";
import debug from "debug";
debug.enable("nodemailer:*");

async function sendMail(data) {
    try {
        const transport = createTransport({
            service: "gmail",
            auth: { user: process.env.GOOGLE_EMAIL, pass: process.env.GOOGLE_PASS },
        });

        await transport.sendMail({
            from: `Essece Selecto <${process.env.GOOGLE_EMAIL}>`,
            to: data.email,
            subject: `USER ${data.name.toUpperCase()} REGISTERED!`,
            html: `
            <h1>USER REGISTERED!<h1>
            <p>YOU VERIFICATION CODE: ${data.verifiedCode}</p>
            `,
        });
    } catch (error) {
        throw error;
    }
}

export default sendMail;
