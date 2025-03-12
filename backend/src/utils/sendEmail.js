import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail", 
    auth: {
        user: `${process.env.SENDERS_EMAIL}`, 
        pass: `${process.env.EMAIL_APP_PASSWORD}` 
    },
});

const sendMail = async (to, subject, text) => {
    try {
        console.log("To", to);
        console.log("subject", subject)
        console.log("text", text)
        const info = await transporter.sendMail({
            from: `"${process.env.SENDERS_NAME}" <${process.env.SENDERS_EMAIL}>`,
            to, 
            subject,
            text,
        });
        console.log("Email sent: ", info.messageId);
        return;
    } catch (error) {
        console.error("Error sending email: ", error);
    }
};

export {sendMail}