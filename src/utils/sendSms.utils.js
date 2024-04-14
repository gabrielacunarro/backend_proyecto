import twilio from "twilio";
import dotenv from "dotenv";
import winston from "./logger/winston.utils.js";

dotenv.config(); 

async function sendSms(phone) {
    try {
        const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
        await client.messages.create({
            body: "Message sent from the Essence App",
            from: process.env.TWILIO_PHONE,
            to: phone
        });
        winston.INFO("SMS message sent successfully.");
    } catch (error) {
        winston.ERROR("Error sending SMS message:", error);
        throw error;
    }
}

export default sendSms;
