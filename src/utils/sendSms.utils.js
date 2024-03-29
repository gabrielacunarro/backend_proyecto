import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config(); 

async function sendSms(phone) {
    try {
        const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
        await client.messages.create({
            body: "Message sent from the Essence App",
            from: process.env.TWILIO_PHONE,
            to: phone
        });
        console.log("SMS message sent successfully.");
    } catch (error) {
        console.error("Error sending SMS message:", error);
        throw error;
    }
}

export default sendSms;
