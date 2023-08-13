import nodemailer from 'nodemailer';
import User from '@/models/userModal';
import bcryptjs from 'bcryptjs';


export const sendEmail = async ({email, emailType, userId}: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailType === "VERIFY"){
        await User.findByIdAndUpdate(userId, { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 36000000 })

        } else if (emailType === "RESET") {
        await User.findByIdAndUpdate(userId, { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 36000000 })

        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: process.env.NODEMAILER_USERNAME,
              pass: process.env.NODEMAILER_PASSWORD
            }
          });

        const mailOptions = {
            from: "turkyasarfurkan@gmail.com",
            to: "ddmdlcn@gmail.com",
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            text: emailType === "VERIFY" ? "Click the link below to verify your email" : "Click the link below to reset your password",
            html: emailType === "VERIFY" ? `<a href="${process.env.DOMAIN}/verifyemail?toke=${hashedToken}">Verify your email</a>` : `<a href="${process.env.DOMAIN}/reset/${hashedToken}">Reset your password</a`
        }

        const mailResponse = await transport.sendMail(mailOptions);

        return mailResponse;
       
    } catch (error: any) {
        throw new Error(error.message);
    }
}

