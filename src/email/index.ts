import nodemailer, { Transporter } from "nodemailer";

class Mailer {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASSWORD,
      },
    });
  }

  public sendMailAsync(
    mailOptions: nodemailer.SendMailOptions,
    callback: (err: Error | null, info: nodemailer.SentMessageInfo) => void
  ): void {
    this.transporter.sendMail(mailOptions, callback);
  }

  public sendMailSync(
    mailOptions: nodemailer.SendMailOptions
  ): Promise<nodemailer.SentMessageInfo> {
    const mailer = this;

    return new Promise(function (resolve, reject) {
      mailer.transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          reject(err);
        } else {
          resolve(info);
        }
      });
    });
  }
}

export default Mailer;
