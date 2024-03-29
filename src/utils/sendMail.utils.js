import { createTransport } from "nodemailer";
import debug from "debug";
debug.enable("nodemailer:*");

async function sendMail(data) {
    try {
        console.log("Data received in sendMail:", data); ///
        console.log("Verified code:", data.verifiedCode);///
        const transport = createTransport({
            service: "gmail",
            auth: { user: process.env.GOOGLE_EMAIL, pass: process.env.GOOGLE_PASS },
        });

        await transport.sendMail({
            from: `ESSENCE <${process.env.GOOGLE_EMAIL}>`,
            to: data.email,
            subject: `USER ${data.name.toUpperCase()} REGISTERED!`,
            html: `
            <h1>USER REGISTERED!<h1>
            <p>VERIFY CODE: ${data.verifiedCode}</p>
            `,
        });
    } catch (error) {
        throw error;
    }
}

export default sendMail;
